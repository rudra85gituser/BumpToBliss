import { PregnancyProvider } from '@/src/context/PregnancyContext';
import GarbhaSanskarCard from './GarbhaSanskarCard';


export default function GarbhaSanskarCardWrapper() {
  return (
    <PregnancyProvider>
      <GarbhaSanskarCard />
      
    </PregnancyProvider>
  );
}
