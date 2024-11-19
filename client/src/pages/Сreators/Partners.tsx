import cn from "../style.module.css";
import sairprogramming from '../../assets/sairprogramming.jpg';
import sair_quiz from '../../assets/sair_quiz.jpg';
import { useTranslation } from 'react-i18next';

export function Partners() {
    const { t } = useTranslation();

    const partners = [
        {
            id: 1,
            name: "SairProgramming",
            description: "Технологический партнер, предоставляющий программное обеспечение для управления бизнесом.",
            website: "https:/t.me/sairprogramming",
            logo: sairprogramming,
        },
        {
            id: 2,
            name: "SairProgramming Quiz",
            description: "Организация, занимающаяся экологическими проектами и устойчивым развитием.",
            website: "https:/t.me/sairprogramming_quiz",
            logo: sair_quiz,
        },

    ];

    return (
        <div className="container ">
            <h1 className="text-center mb-4">{t('our_partners')}</h1>
            <div className="row">
                {partners.map((partner) => (
                    <div key={partner.id} className="col-md-4 mb-4">
                        <a href={partner.website} className="card shadow-sm h-100 text-decoration-none">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className={`card-img-top ${cn.partnerLogo}`}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{partner.name}</h5>
                                <p className="card-text">{partner.description}</p>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
