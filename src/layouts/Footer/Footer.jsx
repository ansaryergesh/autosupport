import React from 'react';
import styles from './index.module.less'
import {Col, Image, Row, Space, Typography} from "antd";
import Logo from 'images/logoFreedom.svg';

const Footer = () => {
    return (
        <div className={styles.footer}>
                <Row gutter={[24,24]} className={"flex-center"}>
                    <Col span={5}>
                        <Space size={10} direction={"vertical "}>
                            <Image src={Logo} preview={false} />
                            <Typography className="my-paragraph">Freedom BrokerРеспублика Казахстан, 050040, г. Алматы, проспект Аль-Фараби 77/7,БЦ «Esentai Tower», 3 и 7 этажи
                            </Typography>
                            <Typography className="my-paragraph">
                                © 2023 АО «Фридом Финанс»
                            </Typography>
                        </Space>
                    </Col>
                    <Col span={19}>
                        <Space size={10} direction={"vertical "}>
                            <Typography className={"my-paragraph"}>Сообщить об обнаруженных проблемах с безопасностью: infosecurity@ffin.kz</Typography>
                            <div>
                                <Typography className={"my-paragraph"}>
                                    Политика конфиденциальности
                                </Typography>
                                <Typography className={"my-paragraph"}>
                                    Владение ценными бумагами и прочими финансовыми инструментами всегда сопряжено с рисками: стоимость ценных бумаг и прочих финансовых инструментов может как расти, так и падать. Результаты инвестирования в прошлом не гарантируют получение доходов в будущем. В соответствии с законодательством, компания не гарантирует и не обещает в будущем доходности вложений, не дает гарантии надежности возможных инвестиций и стабильности размеров возможных доходов.</Typography>
                            </div>
                        </Space>
                    </Col>
                </Row>
        </div>
    )
}

export default Footer;