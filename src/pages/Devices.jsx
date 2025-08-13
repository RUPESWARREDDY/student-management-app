import React from 'react'
import SubHeader from '../features/equinox/SubHeader'
import EquipmentCarousel from '../features/equinox/EquipmentCarousel';
import FilterEquipment from '../features/equinox/FilterEquipment';

function Devices() {
  return (
   <div data-testid="devices-container">
     <SubHeader/>
     <EquipmentCarousel />
      <FilterEquipment/>
   </div>
  )
}

export default Devices
