import { Typography } from 'antd';
import { useRouter } from 'next/router';
import * as React from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';

const {Title} = Typography;

export interface ProductDetailProps {
}

export default function ProductDetail (props: ProductDetailProps) {
  const router = useRouter()
  const titleCat = router.query.keyword
  return (<>
  <Navbar/>
  <button onClick={() => router.back() } style={{float:'right'}}>Go back</button>
  <div>
      <Typography>
        <Title style={{ textAlign: 'center', paddingTop: '1vh' }} >
          {titleCat}
        </Title>
      </Typography>
      <ProductCard/>
    </div>
  </>
    
  );
}
