import {
  Image,
  Text,
  View,
  Page,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    margin: 5,
  },
  image: {
    width: 200,
    height: 100,
  },
  text: {
    margin: 10,
  },
});

export default function PDFComponent({ groupName, groupDesc, groupImg, card }) {
  return (
    <Document>
      <Page style={styles.page}>
        <View className="flex flex-col space-y-3">
          <Text>GroupName:= {groupName}</Text>
          <Text>Description:= {groupDesc}</Text>
          {groupImg ? <Image src={groupImg} style={styles.image} /> : null}

          <Text> </Text>
        </View>
        <View className="flex flex-col space-y-3">
          {card?.map((item) => {
            return (
              <View key={item.id}>
                <Text>
                  {item.id}. Term:= {item.term}
                </Text>
                <Text>Definition:= {item.definition}</Text>
                {item.img ? (
                  <Image src={item.img} style={styles.image} />
                ) : null}

                <Text> </Text>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
}
