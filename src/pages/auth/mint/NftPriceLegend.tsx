import { Text, useColorModeValue, Link, useDisclosure } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { ProtocolCostModal } from "src/components/contract/modals/ProtocolCost";
export default function NftPriceLegend() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const color = useColorModeValue('gray.800', 'gray.200');
    const { t } = useTranslation();
    return (
        <>
        <Text fontSize={'lg'} color={color} textAlign="center" >
                {t('minting_page.label_cost_the')} <b> {t('minting_page.label_cost_sort')} </b>
                {t('minting_page.label_cost_username')}
                <Link
                    color={'blue.400'}
                    onClick={onOpen}
                >
                    <b>{' ' + t('minting_page.label_cost_exp')}</b>
                </Link>
                {' ' + t('minting_page.label_cost_willbe')}
            </Text>
            <ProtocolCostModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}
