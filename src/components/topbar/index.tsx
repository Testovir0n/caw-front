import {
    Wrap, WrapItem, useColorModeValue, Button as CrkButton, Text,
    Center, useDisclosure, VStack, useToken
} from '@chakra-ui/react';
import { usePathname } from 'next/navigation';

import CawPrice from 'src/components/contract/stats/CawPrice';
import EthPrice from 'src/components/contract/stats/EthPrice';
import Wallet from 'src/components/contract/wallet/Wallet';
import Iconify from "src/components/icons/Iconify";
import { ProtocolCostModal } from "src/components/contract/modals/ProtocolCost";
import LanguagePopover from 'src/components/settings/LanguagePopover';

import { PATH_DASHBOARD } from "src/routes/paths";
import TopBarMenuButton from "./menu";

function ItemWrapper({ children, padding, minW = "6rem" }: { children: React.ReactNode, padding?: string, minW?: string }) {

    return (
        <WrapItem
            borderRadius="md"
            _hover={{ bg: 'whiteAlpha.100' }}
            p={padding ?? '0.2rem'}
            minW={minW}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
        >
            {children}
        </ WrapItem>
    );
}

function CalculatorItem({ iconColor, textColor }: { iconColor: string, textColor: string }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <VStack
            onClick={onOpen}
            cursor="pointer"
        >
            <Text fontSize="medium" color={textColor} >
                CALC
            </Text>
            <Iconify icon="mdi:file-table-box" color={iconColor} />
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}

export default function TopBar() {

    const path = usePathname();
    const showNewPostButton = path !== PATH_DASHBOARD.app.home;
    const showLanguagePopover = path !== PATH_DASHBOARD.app.settings;

    const wBgDark = useColorModeValue('blueCaw.500', 'gray.800');
    const wBgLight = `background-color: #FAD961;
    background-image: linear-gradient(90deg, #FAD961 0%, #F76B1C 100%);
    `
    const bg = useColorModeValue(wBgLight, wBgDark);

    const textColor = useColorModeValue('gray.50', 'gray.50');
    const iconColor = useColorModeValue('gray.50', 'gray.800');
    const [ icLight, icDark ] = useToken('colors', [ 'gray.300', 'gray.500' ]);
    const menuItemIconColor = useColorModeValue(icLight, icDark);
    const hoverColor = useColorModeValue('whiteAlpha.100', 'gray.800');
    const shadowBottom = '0 0 20px 20px rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)';

    return (
        <Wrap
            id="main-content-wrapper-topbar-options"
            align='center'
            justify={{ base: 'center', md: 'space-between', lg: 'flex-end' }}
            border="ActiveBorder"
            bg={bg}
            color={textColor}
            p='0.5rem'
            spacing={5}
            shadow={shadowBottom}
            overflow="hidden"
        >
            <ItemWrapper>
                <CalculatorItem iconColor={iconColor} textColor={textColor} />
            </ItemWrapper>
            <ItemWrapper>
                <CawPrice watch />
            </ItemWrapper>
            <ItemWrapper>
                <EthPrice watch />
            </ItemWrapper>
            {showNewPostButton && (
                <ItemWrapper>
                    <CrkButton
                        leftIcon={<Iconify icon="la:crow" color={iconColor} />}
                        _hover={{ bg: hoverColor }}
                        variant={"ghost"}
                    >
                        + Post
                    </CrkButton>
                </ItemWrapper>
            )}
            {showLanguagePopover && (
                <ItemWrapper padding="0.0rem" minW="0.0rem">
                    <Center>
                        <LanguagePopover />
                    </Center>
                </ItemWrapper>
            )}
            <ItemWrapper>
                <Wallet
                    iconColor={iconColor}
                    hoverColor={hoverColor}
                    buttonProps={{
                        color: textColor,
                        _hover: {
                            bg: hoverColor,
                        }
                    }}
                    buttonGroup={{
                        color: textColor,
                    }}
                    menuButtonProps={{
                        color: textColor,
                        _hover: {
                            bg: hoverColor,
                        },
                        _active: {
                            bg: hoverColor,
                        }
                    }}
                />
            </ItemWrapper>
            <ItemWrapper>
                <TopBarMenuButton
                    iconColor={textColor}
                    textColor={textColor}
                    itemIconColor={menuItemIconColor}
                />
            </ItemWrapper>
        </Wrap>
    );
}