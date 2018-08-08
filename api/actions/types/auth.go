package types

import (
	"errors"
	"fmt"
	"github.com/graphql-go/graphql"
	"gopkg.in/ldap.v2"
	"os"
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

func AuthResolver(params graphql.ResolveParams) (interface{}, error) {
	// graphql should be ok
	username, _ := params.Args["name"].(string)
	// graphql should be ok
	password, _ := params.Args["pwd"].(string)

	l, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", hostLDAP, 389))
	if err != nil {
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
		return nil, err
	}

	if len(sr.Entries) != 1 {
		return nil, errors.New("User does not exist or too many entries returned")
	}

	userDN := sr.Entries[0].DN
	dn, err := ldap.ParseDN(userDN)
	if err != nil {
		return nil, err
	}

	// Bind as the user to verify their password
	err = l.Bind(userDN, password)
	if err != nil {
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

	return &Auth{
		Name:   exactName,
		Token:  "hello world",
		Expire: 10000,
	}, nil
}
