import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

export default function PDFComponent({ groupName, groupDesc, groupImg, card }) {
  return (
    <Document>
      <Page>
        <View className="flex flex-col space-y-3">
          <Text>GroupName:= {groupName}</Text>
          <Text>Description:= {groupDesc}</Text>
          <Image src={groupImg} />
        </View>
        <View className="flex flex-col space-y-3">
          {card?.map((item) => {
            return (
              <View key={item.id}>
                <Text>{item.id}</Text>
                <Text>Term:= {item.term}</Text>
                <Text>Definition:= {item.definition}</Text>
                <Image src={item.img} />
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
