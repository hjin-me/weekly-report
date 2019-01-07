module git.avlyun.org/inf/weekly/api

require (
	git.avlyun.org/inf/go-pkg v0.1.0
	github.com/dgrijalva/jwt-go v3.2.0+incompatible
	github.com/gin-gonic/gin v1.3.0
	github.com/graphql-go/graphql v0.7.7
	github.com/lib/pq v1.0.0
	github.com/mitchellh/mapstructure v1.1.2
	github.com/stretchr/testify v1.3.0 // indirect
	golang.org/x/sys v0.0.0-20190106192425-1775db3f06b5 // indirect
	gopkg.in/asn1-ber.v1 v1.0.0-20181015200546-f715ec2f112d // indirect
	gopkg.in/ldap.v2 v2.5.1
)

replace golang.org/x/sys => github.com/golang/sys v0.0.0-20190106192425-1775db3f06b5

replace golang.org/x/net => github.com/golang/net v0.0.0-20181220203305-927f97764cc3

replace golang.org/x/sync => github.com/golang/sync v0.0.0-20181221193216-37e7f081c4d4
