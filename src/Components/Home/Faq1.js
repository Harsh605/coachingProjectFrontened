import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';


const LinkColor = "#494e56";
const ButtonColor = "#5b58ff";

export default function Frequentquestions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion sx={{borderRadius:".25rem", margin:"5px",border:`0.1px solid ${LinkColor}`}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className='smallHeading' sx={{fontFamily:"Clash Display",fontWeight:"500"}} >Q: What is blockchain?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}} >
          A: Blockchain is a decentralized, digital ledger that records transactions in a way that is secure, transparent, and resistant to modification. It allows parties to conduct transactions without the need for intermediaries, such as banks or governments, by using cryptographic techniques to validate and verify transactions.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{borderRadius:".25rem", margin:"5px",border:`0.1px solid ${LinkColor}`}} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          {/* <Typography className='mulish' sx={{ width: '33%', flexShrink: 0, fontFamily:'Mulish' }}>Users</Typography> */}
          <Typography className='smallHeading'  sx={{fontFamily:"Clash Display",fontWeight:"500"}}>
          Q: What is a token?
                    </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
          A: A token is a digital asset that represents a specific value or utility within a blockchain network. Tokens can be used for a variety of purposes, including as a means of exchange, to access a specific service, or to represent ownership or investment in a project.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{borderRadius:".25rem", margin:"5px",border:`0.1px solid ${LinkColor}`}} expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography className='smallHeading' sx={{fontFamily:"Clash Display",fontWeight:"500"}}>
          Q: What is DeFi?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
          A: DeFi stands for Decentralized Finance, which is a system of financial applications and services built on a decentralized blockchain network. It aims to provide a more open, transparent, and accessible financial system that is not controlled by a single entity.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{borderRadius:".25rem", margin:"5px",border:`0.1px solid ${LinkColor}`}} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography> */}
          <Typography className='smallHeading' sx={{fontFamily:"Clash Display",fontWeight:"500"}} >
          Q: What are stablecoins?
                    </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
          A: Stablecoins are cryptocurrencies that are designed to maintain a stable value relative to a specific asset, such as the US dollar or gold. They are often used to provide stability and reduce volatility in the cryptocurrency market.
          </Typography>
        </AccordionDetails>
      </Accordion>
      
      <Accordion sx={{borderRadius:".25rem", margin:"5px",border:`0.1px solid ${LinkColor}`}} expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<AddIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography> */}
          <Typography className='smallHeading' sx={{fontFamily:"Clash Display",fontWeight:"500"}} >
          Q: What is a NFT?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography className='restContent' sx={{ fontSize: "16px", fontFamily: "Inter"}}>
          A: An NFT (Non-Fungible Token) is a unique digital asset that is stored on a blockchain network. Unlike fungible tokens like Bitcoin, each NFT is one-of-a-kind and cannot be replicated or divided.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}