#!/bin/bash
for i in `seq 1 10000`;
do
        echo $i
        echo $i This message goes to stderr >&2
done 
