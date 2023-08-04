import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {Difficulty} from '../util/storage';

interface Props {
  title: string;
  value: string;
  handleValueChange: (value: string) => void;
  list: Array<string | Difficulty>;
}
export default function OptionItemDropDown({
  handleValueChange,
  value: v,
  list,
  title,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(v);

  const listToItem = list.map(item => {
    return {label: item, value: item};
  });

  const [items, setItems] = useState(listToItem);

  return (
    <View style={style.item}>
      <Text style={{color: '#F6F4EB', fontSize: 18, fontWeight: 'bold'}}>
        {title}
      </Text>
      <View>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={change => {
            if (change) {
              handleValueChange(change);
            }
          }}
          style={{width: 100}}
        />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  item: {
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    borderRadius: 25,
    backgroundColor: '#91C8E4',
  },
});
