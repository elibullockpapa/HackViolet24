import { useNavigate } from 'react-router-dom'; //npm install react-router-dom
import Box from '@mui/joy/Box';
import TabList from '@mui/joy/TabList';
import Tabs from '@mui/joy/Tabs';
import Tab from '@mui/joy/Tab';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

function RenterUI() {
  const navigate = useNavigate();

  const handleOfferClick = () => {
    navigate("/tenantview"); // Navigate to the PDF Viewer
  };

  const tabsData = [
    { value: 'offers', label: 'Offers' }
  ];

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      {/* Lighter Blue Gradient Header */}
      <Box sx={{
        height: '10%',
        width: '100%',
        background: 'linear-gradient(to bottom, rgba(0, 40, 225, 0.2), transparent)'
      }} />

      {/* Tabs for Profile and Offers */}
      <Box sx={{ width: '100%', position: 'sticky', top: '10%', bgcolor: 'background.default', zIndex: 1100 }}>
        <Tabs
          aria-label="Renter tabs"
          value={'offers'}
        >
          <TabList variant="soft">
            {tabsData.map((tab) => (
              <Tab key={tab.value} value={tab.value}>
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </Tabs>
      </Box>

      {/* Tab Panel for Offers */}
      
         <Box sx={{ position: 'absolute', top: '15%', left: '15%', transform: 'translateX(-50%)', p: 3 }}>
          {/* Button for the Pending Offer */}
          <Sheet
            variant="outlined"
            sx={{ 
              width: 200,  // Large square shape
              height: 200,
              padding: 2, 
              borderColor: 'primary', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',  // Aligns the text to the bottom
              alignItems: 'center'
            }}
            onClick={handleOfferClick}
          >
            <Typography sx={{ mb: 1 }}>  {/* Margin at the bottom for spacing */}
              Pending Offer
            </Typography>
          </Sheet>
        </Box>
      
    </Box>
  );
}

export default RenterUI;
