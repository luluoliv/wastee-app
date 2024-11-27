import React, { useState } from "react";
import tw from "@/src/lib/tailwind";

import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import Button from "@/src/components/button";
import { blurBottom, blurTop, robot } from "@/src/utils/imports";
import Modal from "@/src/components/modal";

export default function Initial() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <Modal
                title="Termos de Serviço e Política de Privacidade"
                visible={isOpen}
                onClose={() => setIsOpen(false)}
            >
                <Text style={tw`text-grayscale-100 font-normal text-base`}>
                    Política de Privacidade - Wastee Última atualização: 03/11 A
                    sua privacidade é nossa prioridade. Esta Política de
                    Privacidade explica como coletamos, usamos e protegemos as
                    informações dos usuários do aplicativo Wastee, disponível na
                    Google Play Store. Ao utilizar nosso aplicativo, você
                    concorda com os termos aqui descritos.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    1. Dados Coletados
                    {"\n"}
                    Ao usar o Wastee, podemos coletar as seguintes informações:
                    {"\n"}
                    1.1 Informações Fornecidas pelo Usuário Nome, e-mail,
                    endereço de entrega, número de telefone, e informações de
                    pagamento inseridas durante o cadastro ou ao realizar
                    compras.
                    {"\n"}
                    1.2 Informações Coletadas Automaticamente Dados técnicos,
                    como endereço IP, tipo de dispositivo, sistema operacional,
                    e dados de cookies para melhorar sua experiência no app.
                    Localização geográfica (com seu consentimento).
                    {"\n"}
                    1.3 Informações de Transações Detalhes sobre os produtos
                    adquiridos, valores pagos, e formas de pagamento utilizadas.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    2. Uso das Informações
                    {"\n"}
                    As informações coletadas são utilizadas para:
                    {"\n"}- Processar e entregar pedidos de forma eficiente.
                    {"\n"}- Melhorar o funcionamento e a personalização do
                    aplicativo.
                    {"\n"}- Enviar atualizações sobre pedidos, promoções, ou
                    novidades.
                    {"\n"}- Proteger o app contra fraudes e violações de
                    segurança.
                    {"\n"}- Cumprir com exigências legais aplicáveis.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    3. Compartilhamento de Dados
                    {"\n"}O Wastee não compartilha suas informações pessoais com
                    terceiros, exceto em casos específicos, como:
                    {"\n"}- Provedores de Serviços: Empresas responsáveis por
                    processar pagamentos e realizar entregas.
                    {"\n"}- Requisição Legal: Quando solicitado por autoridades
                    competentes.
                    {"\n"}- Análise de Dados: Ferramentas como Google Analytics
                    para entender e melhorar o uso do app.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    4. Armazenamento e Segurança dos Dados
                    {"\n"}
                    Seus dados são armazenados de forma segura, utilizando
                    medidas técnicas e organizacionais para protegê-los contra
                    acessos não autorizados. Apesar de nossos esforços, nenhum
                    sistema é completamente seguro, e encorajamos você a
                    proteger suas credenciais.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    5. Seus Direitos
                    {"\n"}
                    Como usuário do Wastee, você tem os seguintes direitos:
                    {"\n"}- Solicitar acesso às informações que armazenamos.
                    {"\n"}- Corrigir ou atualizar seus dados pessoais.
                    {"\n"}- Solicitar a exclusão de dados, exceto quando forem
                    necessários para fins legais.
                    {"\n"}- Revogar consentimentos dados anteriormente. Para
                    exercer esses direitos, entre em contato conosco através de
                    Gabriel.vaz.franco@gmail.com
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    6. Cookies e Tecnologias Semelhantes
                    {"\n"}O Wastee utiliza cookies para fornecer uma experiência
                    personalizada e coletar dados estatísticos. Você pode
                    desativar os cookies nas configurações do seu dispositivo,
                    mas isso pode impactar algumas funcionalidades do app.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    7. Alterações na Política de Privacidade
                    {"\n"}
                    Podemos atualizar esta política periodicamente para refletir
                    mudanças no app ou em requisitos legais. Recomendamos
                    revisar esta página regularmente.
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    8. Contato
                    {"\n"}
                    Se tiver dúvidas ou preocupações sobre esta Política de
                    Privacidade, entre em contato conosco:
                    {"\n"}
                    E-mail: Gabriel.vaz.franco@gmail.com
                    {"\n"}
                    Telefone: 11 948960435
                    {"\n\n"}
                    ---
                    {"\n\n"}
                    Essa política é personalizada para o Wastee e segue os
                    padrões exigidos pela Google Play Store. Adapte conforme as
                    necessidades do seu app.
                </Text>
            </Modal>
            <View
                style={tw`flex-1 justify-center items-center bg-grayscale-20`}
            >
                <Image
                    source={blurTop}
                    style={tw`absolute top-0 left-0 right-0 h-1/4`}
                    resizeMode="cover"
                />
                <Image
                    source={blurBottom}
                    style={tw`absolute bottom-0 left-0 right-0 h-1/4`}
                    resizeMode="cover"
                />
                <View style={tw`flex-1 justify-center items-center gap-y-12`}>
                    <Image source={robot} style={tw`w-32 h-32`} />
                    <Text style={tw`text-primary text-5xl font-bold italic`}>
                        Wastee
                    </Text>
                </View>
                <View style={tw`w-full flex-col justify-center gap-y-2 p-4`}>
                    <Button
                        onPress={() => router.push("/login")}
                        title="Vamos começar"
                    />
                    <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                        <Text
                            style={tw`text-sm font-medium text-center text-grayscale-100`}
                        >
                            Ao entrar, você concorda com nossos{" "}
                            <Text style={tw`text-primary`}>
                                Termos de Serviço
                            </Text>{" "}
                            e{" "}
                            <Text style={tw`text-primary`}>
                                Política de Privacidade
                            </Text>
                            .
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
