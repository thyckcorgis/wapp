#!/bin/sh
[ $# != 1 ] && echo "Usage: $0 PORT" && exit 1
process=$(lsof -i:$1 | tail -n1 | awk '{print $2}')
[ "$process" != "" ] && kill $process
