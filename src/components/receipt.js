import React from 'react';
import { Document,Page, pdfjs } from 'react-pdf';
import {useMediaQuery} from 'react-responsive';
import '../styles/receipt.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PDF = ({order}) => {
  const isMobile = useMediaQuery({ query: '(max-width: 400px)' })
  const isTablet = useMediaQuery({ query: '(max-width: 900px)' })
  return (
    <div className='receipt'>
      <Document file = {order.pdf} className = 'document' loading = ''>
        <Page scale = {(!isMobile && !isTablet) ? 1.5 : isMobile ? .6 : 1 } pageNumber = {1} className = 'pdf'/>
      </Document>
    </div>
  )
}



export default PDF