import logo from './logo.svg';
import './App.css';
import Select from './Components/Select';
import Select2 from './Components/Select2';
import Select3 from './Components/Select3';
import { useState } from 'react';

const options1 = [
  {
    value: 'POCO-83408',
    label: 'POCO-83408',
  },
  {
    value: 'POCO-13049',
    label: 'POCO-13049',
  },
  {
    value: 'POCO-78915',
    label: 'POCO-78915',
  },
  {
    value: 'POCO-8000',
    label: 'POCO-8000',
  },
  {
    value: 'POCO-13870',
    label: 'POCO-13870',
  },
  {
    value: 'POCO-76375',
    label: 'POCO-76375',
  },
  {
    value: 'POCO-83302',
    label: 'POCO-83302',
  },
  {
    value: 'POCO-83376',
    label: 'POCO-83376',
  },
  {
    value: 'POCO-9725',
    label: 'POCO-9725',
  },
  {
    value: 'POCO-78874',
    label: 'POCO-78874',
  },
  {
    value: 'POCO-82978',
    label: 'POCO-82978',
  },
  {
    value: 'POCO-15184',
    label: 'POCO-15184',
  },
  {
    value: 'POCO-83337',
    label: 'POCO-83337',
  },
  {
    value: 'POCO-4812',
    label: 'POCO-4812',
  },
  {
    value: 'POCO-3650',
    label: 'POCO-3650',
  },
  {
    value: 'POCO-10769',
    label: 'POCO-10769',
  },
  {
    value: 'POCO-2986',
    label: 'POCO-2986',
  },
  {
    value: 'POCO-17302',
    label: 'POCO-17302',
  },
  {
    value: 'POCO-76114',
    label: 'POCO-76114',
  },
  {
    value: 'POCO-83561',
    label: 'POCO-83561',
  },
  {
    value: 'POCO-83718',
    label: 'POCO-83718',
  },
  {
    value: 'POCO-4842',
    label: 'POCO-4842',
  },
  {
    value: 'POCO-83920',
    label: 'POCO-83920',
  },
  {
    value: '2-RJS-234',
    label: '2-RJS-234',
  },
  {
    value: 'POCO-6178',
    label: 'POCO-6178',
  },
  {
    value: 'POCO-83396',
    label: 'POCO-83396',
  },
  {
    value: 'POCO-83036',
    label: 'POCO-83036',
  },
  {
    value: 'POCO-8453',
    label: 'POCO-8453',
  },
  {
    value: 'POCO-8549',
    label: 'POCO-8549',
  },
  {
    value: 'POCO-83284',
    label: 'POCO-83284',
  },
  {
    value: 'POCO-5510',
    label: 'POCO-5510',
  },
  {
    value: 'POCO-81317',
    label: 'POCO-81317',
  },
  {
    value: 'POCO-8752',
    label: 'POCO-8752',
  },
  {
    value: 'POCO-83235',
    label: 'POCO-83235',
  },
  {
    value: 'POCO-7783',
    label: 'POCO-7783',
  },
  {
    value: 'POCO-81736',
    label: 'POCO-81736',
  },
  {
    value: 'POCO-77274',
    label: 'POCO-77274',
  },
  {
    value: 'POCO-78914',
    label: 'POCO-78914',
  },
  {
    value: 'POCO-3170',
    label: 'POCO-3170',
  },
  {
    value: 'POCO-76054',
    label: 'POCO-76054',
  },
  {
    value: 'POCO-6030',
    label: 'POCO-6030',
  },
  {
    value: 'POCO-6734',
    label: 'POCO-6734',
  },
  {
    value: 'POCO-83274',
    label: 'POCO-83274',
  },
  {
    value: 'POCO-10339',
    label: 'POCO-10339',
  },
  {
    value: 'POCO-76174',
    label: 'POCO-76174',
  },
  {
    value: 'POCO-11660',
    label: 'POCO-11660',
  },
  {
    value: 'POCO-83322',
    label: 'POCO-83322',
  },
  {
    value: 'POCO-8957',
    label: 'POCO-8957',
  },
  {
    value: 'POCO-83035',
    label: 'POCO-83035',
  },
  {
    value: 'POCO-83417',
    label: 'POCO-83417',
  },
  {
    value: 'POCO-83272',
    label: 'POCO-83272',
  },
  {
    value: 'POCO-76654',
    label: 'POCO-76654',
  },
  {
    value: 'POCO-75454',
    label: 'POCO-75454',
  },
  {
    value: 'POCO-15178',
    label: 'POCO-15178',
  },
  {
    value: 'POCO-83332',
    label: 'POCO-83332',
  },
  {
    value: 'POCO-83195',
    label: 'POCO-83195',
  },
  {
    value: '1-RJS-123',
    label: '1-RJS-123',
  },
  {
    value: 'POCO-2874',
    label: 'POCO-2874',
  },
  {
    value: 'POCO-83677',
    label: 'POCO-83677',
  },
  {
    value: 'POCO-82238',
    label: 'POCO-82238',
  },
  {
    value: 'POCO-83299',
    label: 'POCO-83299',
  },
  {
    value: 'POCO-83653',
    label: 'POCO-83653',
  },
  {
    value: 'POCO-83283',
    label: 'POCO-83283',
  },
  {
    value: 'POCO-83681',
    label: 'POCO-83681',
  },
  {
    value: 'POCO-83428',
    label: 'POCO-83428',
  },
  {
    value: 'POCO-6747',
    label: 'POCO-6747',
  },
  {
    value: 'POCO-13496',
    label: 'POCO-13496',
  },
  {
    value: 'POCO-83716',
    label: 'POCO-83716',
  },
  {
    value: 'POCO-76314',
    label: 'POCO-76314',
  },
  {
    value: 'POCO-77914',
    label: 'POCO-77914',
  },
  {
    value: 'POCO-80775',
    label: 'POCO-80775',
  },
  {
    value: 'POCO-75272',
    label: 'POCO-75272',
  },
  {
    value: 'POCO-75225',
    label: 'POCO-75225',
  },
  {
    value: 'POCO-76175',
    label: 'POCO-76175',
  },
  {
    value: 'POCO-83236',
    label: 'POCO-83236',
  },
  {
    value: 'POCO-83564',
    label: 'POCO-83564',
  },
  {
    value: 'POCO-76815',
    label: 'POCO-76815',
  },
  {
    value: 'POCO-83525',
    label: 'POCO-83525',
  },
  {
    value: 'POCO-83433',
    label: 'POCO-83433',
  },
  {
    value: 'POCO-82835',
    label: 'POCO-82835',
  },
  {
    value: 'POCO-8197',
    label: 'POCO-8197',
  },
  {
    value: 'POCO-83630',
    label: 'POCO-83630',
  },
  {
    value: 'POCO-77114',
    label: 'POCO-77114',
  },
  {
    value: 'POCO-10730',
    label: 'POCO-10730',
  },
  {
    value: 'POCO-80081',
    label: 'POCO-80081',
  },
  {
    value: 'POCO-5956',
    label: 'POCO-5956',
  },
  {
    value: 'POCO-9391',
    label: 'POCO-9391',
  },
  {
    value: 'POCO-82875',
    label: 'POCO-82875',
  },
  {
    value: 'POCO-9073',
    label: 'POCO-9073',
  },
  {
    value: 'POCO-77374',
    label: 'POCO-77374',
  },
  {
    value: 'POCO-83175',
    label: 'POCO-83175',
  },
  {
    value: 'POCO-5629',
    label: 'POCO-5629',
  },
  {
    value: 'POCO-7624',
    label: 'POCO-7624',
  },
  {
    value: 'POCO-76194',
    label: 'POCO-76194',
  },
  {
    value: 'POCO-13195',
    label: 'POCO-13195',
  },
  {
    value: 'POCO-6268',
    label: 'POCO-6268',
  },
  {
    value: 'POCO-83547',
    label: 'POCO-83547',
  },
  {
    value: 'POCO-9811',
    label: 'POCO-9811',
  },
  {
    value: 'POCO-7664',
    label: 'POCO-7664',
  },
  {
    value: 'POCO-83260',
    label: 'POCO-83260',
  },
];

const OpenLockIcon = () => {
  return (
    <g transform="translate(-41.553 -52.063)">
      <path
        fill="black"
        d="m113.52 63.736c-22.83-1.8e-5 -41.512 17.713-43.082 40.144-0.0926 0.53339-0.15038 1.0794-0.15038 1.6402v19.445h-3.4732c-4.9387 0-8.9147 3.976-8.9147 8.9147v56.361c0 4.9387 3.976 8.9142 8.9147 8.9142h93.444c4.9387 0 8.9147-3.9755 8.9147-8.9142v-56.361c0-4.9387-3.976-8.9147-8.9147-8.9147h-71.144v-15.086c0.0119-0.52214 0.0279-1.0339 0.0279-1.5927-1.7e-4 -13.881 10.51-25.191 24.391-25.191 13.881-1.6e-4 24.677 11.139 24.677 25.02v23.459l18.51 5.5155v-30.153c2e-5 -23.859-19.342-43.202-43.201-43.201z"
        strokeWidth=".26274"
      />
    </g>
  );
};

function App() {
  const [createWell, setCreateWell] = useState(false);
  const [selectedWell, setSelectedWell] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [parentWidth, setParentWidth] = useState();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{ width: '24rem', display: 'flex', flexDirection: 'row', gap: '20px'}}>
        <Select
          id="wells-selecter"
          options={options1}
          maxOptions={20}
          value={selectedWell}
          handleOption={(e) => {
            setSelectedWell(e);
          }}
          placeholder="Poço"
          label={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              Poço
              <div
                style={{
                  transform: 'scale(0.5)',
                  position: 'absolute',
                  left: '30px'
                }}
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 160 160"
                  onClick={() => {
                    setCreateWell(true);
                  }}
                >
                  <OpenLockIcon />
                </svg>
              </div>
            </div>
          }
          disabled={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          inputValue={inputValue}
          setInputValue={setInputValue}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
        />
        <Select2
          id="wells-selecter"
          options={options1}
          maxOptions={20}
          value={selectedWell}
          handleOption={(e) => {
            setSelectedWell(e);
          }}
          placeholder="Poço"
          label={
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              Poço
              <div
                style={{
                  transform: 'scale(0.5)',
                  position: 'absolute',
                  left: '30px'
                }}
              >
                <svg
                  width="25px"
                  height="25px"
                  viewBox="0 0 160 160"
                  onClick={() => {
                    setCreateWell(true);
                  }}
                >
                  <OpenLockIcon />
                </svg>
              </div>
            </div>
          }
          disabled={false}
        />
        </div>
        <Select3 options={options1}></Select3>
      </header>
    </div>
  );
}

export default App;