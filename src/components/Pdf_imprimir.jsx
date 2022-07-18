import React from 'react';
import {Page, Text, Image, Document, StyleSheet} from '@react-pdf/renderer';

const styles = StyleSheet.create({});

const Pdf_imprimir = () => {
  return (
    <Document>
        <Page>
            <Text>Prueba de documento</Text>
        </Page>
    </Document> 
  )

}

export default Pdf_imprimir;