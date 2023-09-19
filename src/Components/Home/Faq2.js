import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';


const LinkColor = "#494e56";
const ButtonColor = "#5b58ff";
export default function Frequentquestions2() {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion sx={{ borderRadius: ".25rem", margin: "5px",border:`0.1px solid ${LinkColor}` }} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    {/* <Typography className='mulish' sx={{ width: '33%', flexShrink: 0 }}>
            General settings
          </Typography> */}
                    <Typography className='smallHeading' sx={{ fontFamily: "Clash Display", fontWeight: "500" }}>Q: What is an NFT marketplace?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}} >
                        A: An NFT marketplace is a platform that allows creators to sell their unique digital assets (NFTs) to buyers. NFT marketplaces offer a way for creators to monetize their digital creations, such as artwork, music, or video games, and for buyers to purchase unique, one-of-a-kind items.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ borderRadius: ".25rem", margin: "5px",border:`0.1px solid ${LinkColor}` }} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    {/* <Typography className='mulish' sx={{ width: '33%', flexShrink: 0, fontFamily:'Mulish' }}>Users</Typography> */}
                    <Typography className='smallHeading' sx={{ fontFamily: "Clash Display", fontWeight: "500" }}>
                        Q: What is a Layer 1 blockchain?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
                        A: A Layer 1 blockchain is a blockchain network that operates at the base layer of a decentralized system, providing the underlying infrastructure and consensus mechanism for the network
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ borderRadius: ".25rem", margin: "5px",border:`0.1px solid ${LinkColor}` }} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel5bh-content"
                    id="panel5bh-header"
                >
                    <Typography className='smallHeading' sx={{ fontFamily: "Clash Display", fontWeight: "500" }}>
                        Q: How do Layer 1 blockchains differ from Layer 2 solutions?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
                        A: Layer 1 blockchains operate at the base layer of a decentralized system, while Layer 2 solutions are built on top of Layer 1 blockchains to provide additional scalability, speed, and functionality. Layer 2 solutions include sidechains, state channels, and plasma chains, among others.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ borderRadius: ".25rem", margin: "5px",border:`0.1px solid ${LinkColor}` }} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography> */}
                    <Typography className='smallHeading' sx={{ fontFamily: "Clash Display", fontWeight: "500" }}>
                        Q: What is asset tokenization?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
                        A: Asset tokenization is the process of converting a physical asset, such as real estate, art, or commodities, into a digital token that can be traded on a blockchain network.
                    </Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{ borderRadius: ".25rem", margin: "5px",border:`0.1px solid ${LinkColor}` }} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<AddIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography> */}
                    <Typography className='smallHeading' sx={{ fontFamily: "Clash Display", fontWeight: "500" }}>
                        Q: How does asset tokenization work?
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
                        A: Asset tokenization involves creating a digital token that represents a specific asset, such as a piece of real estate. This token is then listed on a blockchain-based marketplace, where investors can buy and sell shares in the asset.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}