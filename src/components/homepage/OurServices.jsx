
import { getServices } from '@/services/getServices';
import ServiceCard from '../cards/ServiceCard';



const OurServices = async() => {
   const services=await getServices()
//    console.log(services)
    return (
       <div className='container mx-auto'>
        Our Services:
         <div className='grid grid-cols-3 gap-5'>
            
            {
                services?.map(service=><ServiceCard  key={service._id} service={service} ></ServiceCard>)
            }
            
        </div>
       </div>
    );
};

export default OurServices;