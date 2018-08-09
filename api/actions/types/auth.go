package types

import (
  "errors"
  "fmt"
  "github.com/dgrijalva/jwt-go"
  "github.com/graphql-go/graphql"
  "gopkg.in/ldap.v2"
  "os"
  "time"
  "github.com/hjin-me/weekly-report/api/logex"
  "net/http"
  "strings"
)

var AuthType = graphql.NewObject(graphql.ObjectConfig{
  Name: "Auth",
  Fields: graphql.Fields{
    "name": &graphql.Field{
      Type: graphql.String,
    },
    "token": &graphql.Field{
      Type: graphql.String,
    },
    "expire": &graphql.Field{
      Type: graphql.Int,
    },
  },
})

type Auth struct {
  Name   string `json:"name"`
  Token  string `json:"token"`
  Expire int    `json:"expire"`
}

var hostLDAP = os.Getenv("LDAP_HOST")
var baseDN = os.Getenv("LDAP_BASE_DN")
var jwtSecret = []byte(os.Getenv("JWT_SECRET"))

func AuthResolver(params graphql.ResolveParams) (interface{}, error) {
  // graphql should be ok
  username, _ := params.Args["name"].(string)
  // graphql should be ok
  password, _ := params.Args["pwd"].(string)

  l, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", hostLDAP, 389))
  if err != nil {
    logex.Info("connect ldap failed")
    return nil, err
  }
  defer l.Close()

  // Search for the given username
  searchRequest := ldap.NewSearchRequest(
    baseDN,
    ldap.ScopeWholeSubtree, ldap.NeverDerefAliases, 0, 0, false,
    fmt.Sprintf("(&(objectClass=organizationalPerson)(uid=%s))", username),
    []string{"dn"},
    nil,
  )

  sr, err := l.Search(searchRequest)
  if err != nil {
    logex.Info("search failed")
    return nil, err
  }

  if len(sr.Entries) != 1 {
    logex.Info("too many users or no user")
    return nil, errors.New("user does not exist or too many entries returned")
  }

  userDN := sr.Entries[0].DN
  dn, err := ldap.ParseDN(userDN)
  if err != nil {
    logex.Info("ldap parse dn failed")
    return nil, err
  }

  // Bind as the user to verify their password
  err = l.Bind(userDN, password)
  if err != nil {
    logex.Info("ldap bind failed")
    return nil, err
  }
  var exactName = ""
  for _, attr := range dn.RDNs {
    for _, rdn := range attr.Attributes {
      if exactName != "" {
        break
      }
      if rdn.Type == "cn" {
        exactName = rdn.Value
        break
      }
    }
    if exactName != "" {
      break
    }
  }
  token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "dsp": exactName,
    "exp": time.Now().Add(6 * time.Hour).Unix(),
    "nbf": time.Now().Add(-5 * time.Minute).Unix(),
  })

  // Sign and get the complete encoded token as a string using the secret
  tokenString, err := token.SignedString(jwtSecret)
  if err != nil {
    logex.Info("jwt token failed")
    return nil, err
  }

  return &Auth{
    Name:   exactName,
    Token:  tokenString,
    Expire: int(6 * time.Hour / time.Second),
  }, nil
}

func AuthUserName(r *http.Request) (string, error) {

  authHeader := r.Header.Get("Authorization")
  if authHeader == "" || strings.Index(authHeader, "bearer ") != 0 {
    return "", nil
  }
  tokenString := authHeader[7:]
  token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
    // Don't forget to validate the alg is what you expect:
    if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
      return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
    }

    // hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
    return jwtSecret, nil
  })
  if err != nil {
    return "", err
  }

  if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
    dsp, o := claims["dsp"].(string)
    if !o {
      return "", errors.New("token missing dsp")
    }
    return dsp, nil
  }

  return "", errors.New("token some unknown error")
}
