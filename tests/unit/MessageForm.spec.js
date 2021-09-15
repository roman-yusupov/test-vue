import MessageForm from '../../src/components/MessageForm.vue'
import flushPromises from 'flush-promises'

import {render, fireEvent } from '@testing-library/vue'

jest.mock("axios", () => ({
  post: () => Promise.resolve({ data: {id: "testID"} })
}))


test('It works correctly', async () => {
  
  const { debug , getByText, getByTestId } = render(MessageForm);
  //debug();

  getByText('Name');
  getByText('Email');
  getByText('Subject');
  getByText('Message');
  getByText('Send message');  
  
  getByTestId('name');
  getByTestId('email');
  getByTestId('subject');
  getByTestId('message');
  getByTestId('send');  

  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);    
  
  await fireEvent.update(getByTestId('name'),  'tt') 
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);     
  
  await fireEvent.update(getByTestId('name'),  '-01234567890123456789012345678901234567890123456789') 
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);      
  
  await fireEvent.update(getByTestId('name'),  'Test name') 
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);    
  
  await fireEvent.update(getByTestId('email'), 'test.test')
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);   
  
  await fireEvent.update(getByTestId('email'), 'test@test.test')
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);    

  await fireEvent.update(getByTestId('message'), 'test message')  
  await fireEvent.click(getByTestId('send'))  
  console.log(getByTestId('error').textContent);    
     

  await flushPromises()     
  console.log(getByTestId('success').textContent);  
    
});

