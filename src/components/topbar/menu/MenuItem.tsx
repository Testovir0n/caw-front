import { useColorModeValue, Text, Link, ListItem, HStack, Spacer } from '@chakra-ui/react';

import Iconify from "src/components/icons/Iconify";

export type MenuItemProps = {
    useIcon: boolean,
    icon: string,
    iconColor: string,
    label: string,
    useLink: boolean,
    href?: string,
    isExternal?: boolean,
    onClick?: () => void,
}

export default function MenuItem({ useLink, href, useIcon = true, icon, iconColor, label, isExternal, onClick }: MenuItemProps) {

    const hoverColor = useColorModeValue('blackAlpha.50', 'whiteAlpha.100');
    console.log("MenuItem.iconColor: ", iconColor);

    return (
        <ListItem>
            <Link
                as={useLink ? "a" : "div"}
                isExternal={isExternal}
                href={href}
                textDecoration="none"
                cursor="pointer"
                onClick={onClick}
            >
                <HStack
                    borderRadius="md"
                    padding={4}
                    _hover={{ bg: hoverColor }}
                    textDecoration="none"
                >
                    {useIcon && icon && iconColor && <Iconify icon={icon} color={iconColor} />}
                    <Spacer />
                    <Text textDecoration="none">
                        {label}
                    </Text>
                </HStack>
            </Link>
        </ListItem>
    );
}
