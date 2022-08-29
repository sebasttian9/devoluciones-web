import React, {useEffect} from 'react'
import JsBarcode from "jsbarcode";


const BarcodeRenderer = props => {
    useEffect(() => {
      JsBarcode(props.name).init();
    }, []);
    return null;
  };
  
  const Barcode = props => {
    return (
      <svg
        class="barcode"
        jsbarcode-format="CODE128"
        jsbarcode-value={props.value}
        jsbarcode-textmargin="0"
        jsbarcode-fontoptions="bold"
      />
    );
  };
  
  const BarcodeStrip = props => {
    return (
      <div className='mt-2'>
        <Barcode value={props.value} />
        <BarcodeRenderer name=".barcode" />
      </div>
    );
  };
  
  export default BarcodeStrip;