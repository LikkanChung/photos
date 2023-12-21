# VPC

resource "aws_vpc" "vpc-1" {
    cidr_block = "10.0.0.0/16"
    tags = {
        Name = "lkc-vpc-1"
    }
}

resource "aws_internet_gateway" "vpc-1-internet-gateway" {
    vpc_id = "${aws_vpc.vpc-1.id}"
    tags = {
        Name = "lkc-vpc-1-internet-gatway"
    }
}

resource "aws_route_table" "vpc-1-route-table" {
    vpc_id = "${aws_vpc.vpc-1.id}"
    route {
        # Routes all traffic to vpc-1-internet-gateway
        cidr_block = "0.0.0.0/0"
        gateway_id = "${aws_internet_gateway.vpc-1-internet-gateway.id}"
    }
    route {
        # Routes all traffic to vpc-1-internet-gateway
        ipv6_cidr_block = "::/0"
        gateway_id = "${aws_internet_gateway.vpc-1-internet-gateway.id}"
    }
    tags = {
        Name = "lkv-vpc-1-route-table"
    }
}

# PUBLIC SUBNET 

resource "aws_subnet" "public-subnet-1" {
    vpc_id = "${aws_vpc.vpc-1.id}"
    cidr_block = "10.0.1.0/24"
    tags = {
        Name = "lkc-public-subnet-1"
    }
}

resource "aws_route_table_association" "vpc-1-public-subnet-1-route-table-association" {
    subnet_id = "${aws_subnet.public-subnet-1.id}"
    route_table_id = "${aws_route_table.vpc-1-route-table.id}"
}

resource "aws_elastic_ip" "public-subnet-1-elastic-ip" {
    # Public IP
    vpc = true
    network_interface = "${aws_network_interface.public-subnet-1-network-interface.id}"
    associate_with_private_id = "10.0.1.100"
    depends_on = "${aws_internet_gateway.vpc-1-internet-gateway}"
}

resource "aws_security_group" "public-subnet-1-security-group-allow-web" {
    name = "allow_web_traffic"
    description = "Allow web traffic inbound"
    vpc_id = "${aws_vpc.vpc-1.id}"
    ingress {
        description = "HTTPS from Internet"
        from_port = 443
        to_port = 443
        protocol = "tcp"
        cidr_block = ["0.0.0.0/0"]
    }
    ingress {
        description = "HTTP from Internet"
        from_port = 80
        to_port = 80
        protocol = "tcp"
        cidr_block = ["0.0.0.0/0"]
    }
    egress {
        # Allow all
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }
    tags = {
        Name = "lkc-public-subnet-1-allow-web"
    }
}

resource "aws_network_interface" "public-subnet-1-network-interface" {
    subnet_id = "${aws_subnet.public-subnet-1.id}"
    private_ips = ["10.0.1.100"]
    security_groups = ["${aws_security_group.public-subnet-1-security-group-allow-web.id}"]
}
