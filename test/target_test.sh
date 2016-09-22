#!/bin/bash
#
# Name: target_test.sh
#
# Purpose:
#    to test script
#
###########################################################

testNoArgment() {
    ../src/train.sh > /dev/null
    assertEquals $? 1
}

testEmptyArgment() {
    ../src/train.sh "" > /dev/null
    assertEquals $? 1
}

testNotValidUrl1() {
    ../src/train.sh "xxxxx" > /dev/null
    assertEquals $? 1
}

testNotValidUrl2() {
    ../src/train.sh "ftp://ftp.jaist.ac.jp/" > /dev/null
    assertEquals $? 1
}

testHttpsURL() {
    ../src/train.sh "http://transit.yahoo.co.jp/traininfo/detail/21/0/" > /dev/null
    assertEquals $? 0
}

testHttpURL() {
    ../src/train.sh "http://ftp.jaist.ac.jp/" > /dev/null
    assertEquals $? 0
}

# Contents test?
testContent() {
    result=$(../src/train.sh "http://transit.yahoo.co.jp/traininfo/detail/21/0/")
    assertTrue "[ \"$(echo ${result} | grep -E '.*,.*,.*')\" != \"\" ]"
}

. shunit2-2.1.6/src/shunit2
