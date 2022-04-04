import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts} from '../../../utils';
import OtherBubble from './OtherBubble';
import MyBubble from './MyBubble';

const ChatItem = ({isMe}) => {
  if (isMe) {
    return <MyBubble />;
  } else {
    return <OtherBubble />;
  }
};

export default ChatItem;

const styles = StyleSheet.create({});
