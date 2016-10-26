#!/bin/bash
# a script to absoultely destroy any files with a certain name
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
for i in $( find $DIR -name $1 ); do
	rm -R $i
done
