// Custom Writer use SetOutput
// Custom Level use SetLogLevel
// handle log fatal use SetCancel
package logex

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log"
	"os"
)

type Level uint

var (
	loggerOut,
	loggerErr *log.Logger
)

// color
var (
//green        = string([]byte{27, 91, 57, 55, 59, 53, 50, 109})
//white  = string([]byte{27, 91, 57, 48, 59, 53, 55, 109})
//yellow = string([]byte{27, 91, 57, 55, 59, 53, 51, 109})
//red    = string([]byte{27, 91, 57, 55, 59, 53, 49, 109})
//blue   = string([]byte{27, 91, 57, 55, 59, 53, 53, 109})
//magenta      = string([]byte{27, 91, 57, 55, 59, 53, 53, 109})
//cyan         = string([]byte{27, 91, 57, 55, 59, 53, 54, 109})
//reset = string([]byte{27, 91, 48, 109})
//disableColor = false
)
var color bool
var logLevel Level = Lmax
var cancel context.CancelFunc

const (
	Lnone Level = iota
	Lfatal
	Lerror
	Lwarning
	Linfo
	Ldebug
	Ltrace
	Lmax
)

var flag int

func init() {
	if os.Getenv("LOG_MODE") != "production" {
		color = true
		SetLogLevel(Ldebug)
		flag = log.Ldate | log.Ltime | log.Llongfile
		defer func() {
			Infof("Mode debug, color=[%v], logLevel=[%d]", color, logLevel)
		}()
	} else {
		flag = log.Ldate | log.Ltime | log.Lshortfile
		SetLogLevel(Linfo)
	}
	loggerOut = log.New(os.Stdout, "", flag)

	loggerErr = log.New(os.Stderr, "", flag)
	cancel = func() {
		panic(errors.New("write log failed, but no context cancel"))
	}
}
func SetOutput(out, err io.Writer) {
	loggerOut = log.New(out, "", flag)

	loggerErr = log.New(err, "", flag)
}
func output(level Level, callDepth int, v ...interface{}) {
	if level > logLevel {
		return
	}
	var err error
	if color {
		switch level {
		case Lfatal:
			err = loggerErr.Output(callDepth, fmt.Sprintf("%s%s%s %s", "\033[0;41m", "FATAL:", "\033[0m", fmt.Sprint(v...)))
		case Lerror:
			err = loggerErr.Output(callDepth, fmt.Sprintf("%s%s%s %s", "\033[0;31m", "ERROR:", "\033[0m", fmt.Sprint(v...)))
		case Lwarning:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s%s%s %s", "\033[0;33m", "WARNING:", "\033[0m", fmt.Sprint(v...)))
		case Linfo:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s%s%s %s", "\033[0;36m", "INFO:", "\033[0m", fmt.Sprint(v...)))
		case Ldebug:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s%s%s %s", "\033[0;32m", "DEBUG:", "\033[0m", fmt.Sprint(v...)))
		}
	} else {
		switch level {
		case Lfatal:
			err = loggerErr.Output(callDepth, fmt.Sprintf("%s %s", "FATAL:", fmt.Sprint(v...)))
		case Lerror:
			err = loggerErr.Output(callDepth, fmt.Sprintf("%s %s", "ERROR:", fmt.Sprint(v...)))
		case Lwarning:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s %s", "WARNING:", fmt.Sprint(v...)))
		case Linfo:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s %s", "INFO:", fmt.Sprint(v...)))
		case Ldebug:
			err = loggerOut.Output(callDepth, fmt.Sprintf("%s %s", "DEBUG:", fmt.Sprint(v...)))
		}
	}
	if err != nil {
		fmt.Printf("%s %v", "FATAL:", err)
		cancel()
	}
}
func outputf(level Level, format string, v ...interface{}) {
	output(level, 4, fmt.Sprintf(format, v...))
}
func SetLogLevel(level Level) {
	logLevel = level
}
// When Log write failed, it will call cancel.
// context.Context should be Done. others goroutine should finish their jobs and exit safety.
func SetCancel(fn context.CancelFunc) {
	cancel = fn
}

// Fatalf is equivalent to Printf() for FATAL-level log.
func Fatalf(format string, v ...interface{}) {
	outputf(Lfatal, format, v...)
}

// Fatal is equivalent to Print() for FATAL-level log.
func Fatal(v ...interface{}) {
	output(Lfatal, 3, v...)
}

// Errorf is equivalent to Printf() for Error-level log.
func Errorf(format string, v ...interface{}) {
	outputf(Lerror, format, v...)
}

// Error is equivalent to Print() for Error-level log.
func Error(v ...interface{}) {
	output(Lerror, 3, v...)
}

// Warningf is equivalent to Printf() for WARNING-level log.
func Warningf(format string, v ...interface{}) {
	outputf(Lwarning, format, v...)
}

// Waring is equivalent to Print() for WARING-level log.
func Warning(v ...interface{}) {
	output(Lwarning, 3, v...)
}

// Infof is equivalent to Printf() for Info-level log.
func Infof(format string, v ...interface{}) {
	outputf(Linfo, format, v...)
}

// Info is equivalent to Print() for Info-level log.
func Info(v ...interface{}) {
	output(Linfo, 3, v...)
}

// Debugf is equivalent to Printf() for DEBUG-level log.
func Debugf(format string, v ...interface{}) {
	outputf(Ldebug, format, v...)
}

// Debug is equivalent to Print() for DEBUG-level log.
func Debug(v ...interface{}) {
	output(Ldebug, 3, v...)
}
