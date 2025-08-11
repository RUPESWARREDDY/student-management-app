import React from 'react'
import SubHeader from '../features/equinox/SubHeader'
import EquipmentCarousel from '../features/equinox/EquipmentCarousel';
import DevicesTable from '../features/equinox/DevicesTable';

function Devices() {
  return (
   <div data-testid="devices-container">
     <SubHeader/>
     <EquipmentCarousel />
     <DevicesTable/>
   </div>
  )
}

export default Devices
