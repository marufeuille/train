#!/bin/bash
#
# Name: train.sh
#
# Purpose:
#    Show the current train delay.
#
# Notes:
#    train.sh "Yahoo.co.jpの運行情報のページURL"
#    -> 路線名,遅延中？,開始時刻
#
# Return codes:
#    0 = All commands were successful
#    1 = At least, one command fails.
#
###########################################################

set -e

# Pre condition check
[ $# -eq 1 ]
[ "${1}" != "" ]
[ "$(echo "${1}" | grep -E '^https*:\/\/[a-zA-Z0-9\.$,;:&=?!*~@#_()\/\-\+]*$')" != "" ]

TMP=$(mktemp)
url="$1"

# Fetch Target URL
curl -o ${TMP} "${url}" 2>/dev/null
if [[ $? -ne 0 ]] ; then
    echo "Error Occuered, while getting ${url}" >2
    exit 1
fi

# Analyze Fetched data
status=$(cat ${TMP} | grep '<span class="icnAlertLarge">' | sed -e "s/<span class=\"icnAlertLarge\">\[.*\]<\/span>\(.*\)<\/dt>$/\1/")
name=$(cat ${TMP} | grep '<title>' | sed -e "s/<title>\(.*\)の運行情報 - .*<\/title>/\1/")
desc=$(cat ${TMP} | grep '<meta property="og:description"' | sed -e 's/^.* content="\(.*\)" .*$/\1/g')

# Output
echo "${name},${status},${desc}"

# Post 
rm -f ${TMP}

exit 0
