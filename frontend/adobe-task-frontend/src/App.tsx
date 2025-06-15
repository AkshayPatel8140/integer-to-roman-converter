import React, { useState } from 'react';
import { Button, defaultTheme, Flex, Provider, Text, TextField, View } from '@adobe/react-spectrum';
import './App.css';

function App() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);

  const convert = async () => {
    try {
      const res = await fetch(`http://localhost:8080/romannumeral?query=${value}`);
      if (!res.ok) {
        const errorText = await res.text();
        setError(true);
        setResult(errorText || "Unknown error occurred");
      } else {
        const data = await res.json();
        setError(false);
        setResult(data.output);
      }
    } catch (err) {
      setError(true);
      setResult("Server error. Please try again later.");
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <View id='container'>
        <Flex height={'100%'} direction="column" alignItems="center" justifyContent='center' >
          <View id='box'>

            {/* The main heading of the application */}
            <Flex rowGap='size-100' direction="column" alignItems={"start"}>
              <Text id='heading'>Roman numeral converter</Text>


              {/* The input field for entering a number */}
              <TextField id='numberEntry' label="Enter number" width='100%' value={value} onChange={setValue} type="number" />

              {/* The button to trigger the conversion */}
              <Flex marginTop='size-200'>
                <Button variant="primary" onPress={convert}>Convert to roman numeral</Button>
              </Flex>

              {error ?
                // If there is an error, display the error message
                <Text id='error'>{result}</Text> :
                // If conversion is successful, display the result
                <Text id='result'>Roman numeral: {result}</Text>}
            </Flex>
          </View>
        </Flex>
      </View>
    </Provider>
  );
}

export default App;
