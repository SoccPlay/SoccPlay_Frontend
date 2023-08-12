import React from "react";
import styled from "styled-components";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service4.png";
export default function Testimonials() {
    return (
        <Section>
            <div className="Section1">
                <div className="service">
                    <div className="icon">
                        <img src={service1} alt="" />
                    </div>
                    <h3>Get Best Prices</h3>
                    <p>
                        Pay through our application and save thousands and get
                        amazing rewards.
                    </p>
                </div>
            </div>
            <div className="Section2">
                <div className="service">
                    <div className="icon">
                        <img src={service2} alt="" />
                    </div>
                    <h3>Find The Best Near You</h3>
                    <p>Find the best ground near you in a single click.</p>
                </div>
            </div>
        </Section>
    );
}

const Section = styled.section`
    padding: 2rem 0;
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: 2.2rem;
    .service {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;
        background-color: aliceblue;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        transition: 0.3s ease-in-out;
        &:hover {
            transform: translateX(0.4rem) translateY(-1rem);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        }
        .icon {
            img {
                height: 2.4rem;
            }
        }
    }
    @media screen and (min-width: 280px) and (max-width: 720px) {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;
