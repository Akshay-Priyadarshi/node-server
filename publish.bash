#!/bin/bash
Environments=("Development" "Staging" "Production")
ImageName="exploreu-server"
read -p "Enter the version number: " version
EnvImageNames=("awwwkshay/$ImageName:dev-v$version" "awwwkshay/$ImageName:stage-v$version" "awwwkshay/$ImageName:prod-v$version")

repeat=true
while $repeat; do
    echo "Select the number corresponding to the environment to publish to:"
    for ((i = 0 ; i < ${#Environments[@]} ; i++)); do
        echo $(($i+1)). ${Environments[$i]}
    done
    read choice
    if [[ $choice -ge 1 && $choice -le ${#Environments[@]} ]]; then
        $repeat = false
        image_name=${EnvImageNames[$(($choice-1))]} 
        echo "Publishing to ${Environments[$(($choice-1))]}"
        echo "Image name: ${image_name}"
        read -p "Do you wish to continue? (y/n): " build
        if [[ "$build" = "y" ]]; then
            echo "Building docker image..."
            docker build -t $image_name .
            echo "Done building..."
        else
            exit
        fi
        read -p "Do you want to publish the image to docker hub? (y/n): " publish
        if [[ "$publish" = "y" ]]; then
            echo "Publishing image to docker hub..."
            docker push $image_name
            echo "Done publishing image to docker hub..."
        else
            exit
        fi
        exit
    else
        echo "Invalid choice"
        $repeat = true
    fi
done
