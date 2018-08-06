package logex

import (
	"bytes"
	"strings"
	"testing"
)

func TestOutput(t *testing.T) {
	SetLogLevel(Ldebug)
	var bf bytes.Buffer
	SetOutput(&bf, &bf)

	var s string
	Debug("123", "abc")
	s = bf.String()
	if strings.Index(s, "DEBUG") == -1 {
		t.Error("Not Output Level", s)
	}
	if strings.Index(s, "123") == -1 {
		t.Error("Not Output 123", s)
	}
	bf.Reset()
	t.Log(bf.String())

	// Test Level
	SetLogLevel(Lerror)
	Debug("456", "xyz")
	s = bf.String()
	if strings.Index(s, "DEBUG") > -1 {
		t.Error("Not Output Level", s)
	}
	if strings.Index(s, "123") > -1 {
		t.Error("Not Output 123", s)
	}
	bf = bytes.Buffer{}
}
