
import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import { CheckBox, ButtonGroup, Button } from 'react-native-elements'
import WebHandler from "../../data/remote/WebHandler"
import Modal from "react-native-modal";
import MyUtils from "../../utils/MyUtils";
import { appPinkColor, appGreyColor } from "../../utils/AppStyles";
import DateTimePicker from "react-native-modal-datetime-picker";
import SelectMultiOptionModal from "../../utils/SelectMultiOptionModal"
import Icon from 'react-native-vector-icons/Feather';
import { Chip } from "react-native-paper"

const yesNo = ["Yes", "No"]
const acceptOrNot = ["Acceptable", "Not Acceptable"]
const acceptHoldReject = ["Accept", "Hold", "Reject"]
const webHandler = new WebHandler()

class FormNo1 extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Receiving Inspection Log",
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            monitorName: "",
            time: "00:00:00",
            InvoiceNo: "",
            itemName: "",
            supplierName: "",
            SPApprovedIndex: 0,
            carrierName: "",
            truckLPlate: "",
            trailerLPlate: "",
            driverLInfo: "",
            trailerSealedIndx: 0,
            trailerLockedIndx: 0,
            materialsFreeIndex: 0,
            truckInsideIndx: 0,
            productCondtionIndx: 0,
            noseProductTemp: "",
            midProductTemp: "",
            tailProductTemp: "",
            vvOfProductIndx: 0,

            allergenContent: [],
            allergentaqggedIndx: 0,
            markedWithExpDateIndx: 0,
            inspectionSummaryIndx: 0,
            followUpAction: "",
            correctiveActionDetail: "",
            isFormSubmitting: false,
            isDateTimePickerVisible: false
        }
    }

    componentDidMount() {
        var allergenContent = [
            { id: 0, key: "N/A", isSelecetd: false },
            { id: 1, key: "W", isSelecetd: false },
            { id: 2, key: "E", isSelecetd: false },
            { id: 3, key: "D", isSelecetd: false },
            { id: 4, key: "TN", isSelecetd: false },
            { id: 5, key: "SH", isSelecetd: false },
            { id: 6, key: "GF", isSelecetd: false },
            { id: 7, key: "None", isSelecetd: false },
        ]
        this.setState({ allergenContent })
    }

    renderLoadingDialog() {
        return (
            <Modal
                isVisible={this.state.isFormSubmitting}
                // onBackdropPress={() => this.setState({ modalVisible: false })}
                onBackButtonPress={() => this.setState({ isFormSubmitting: false })}
            >
                <View style={{ backgroundColor: "#fff", height: 100, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" color={appPinkColor} />
                    <Text>Please Wait...</Text>
                </View>
            </Modal>
        )
    }

    handleTimePicked(date) {
        this.setState({ isDateTimePickerVisible: false })
        var d = new Date(date)
        this.setState({ time: d.toLocaleTimeString() })
    }

    render() {
        const hintColor = "#ccc"
        return (
            <SafeAreaView style={{ flex: 1 }}>

                <ScrollView style={styles.container}>

                    <SelectMultiOptionModal
                        ref="_selectMultiOptionModal"
                        onDonePress={(types) => this.setState({ allergenContent: types })}
                    />

                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        mode={"time"}
                        date={new Date()}
                        onConfirm={(date) => this.handleTimePicked(date)}
                        onCancel={() => this.setState({ isDateTimePickerVisible: false })}
                    />

                    {this.renderLoadingDialog()}

                    <View style={[styles.round_white_bg_container, { marginTop: 10 }]}>
                        <Text> Monitor (Receiver) Name/ Initials: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.monitorName}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ monitorName: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Time: </Text>
                        <TouchableOpacity
                            onPress={() => { this.setState({ isDateTimePickerVisible: true }) }}
                        >
                            <Text style={{ padding: 5, fontSize: 16, color: "black" }}>{this.state.time} </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>P.O./Invoice No.: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.InvoiceNo}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ InvoiceNo: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Item Name: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.itemName}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ itemName: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Suppler Name: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.supplierName}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ supplierName: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Is Supplier and Product On the Approved List? </Text>
                        <ButtonGroup
                            selectedIndex={this.state.SPApprovedIndex}
                            onPress={(index) => this.setState({ SPApprovedIndex: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Carrier Name: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.carrierName}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ carrierName: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Truck License Plate: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.truckLPlate}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ truckLPlate: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Trailer License Plate: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.trailerLPlate}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ trailerLPlate: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Driver License Info (Name, State): </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.driverLInfo}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ driverLInfo: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container, { flexDirection: "row" }]}>
                        <View style={{ flex: 1 }}>
                            <Text>Is Trailer Sealed?</Text>
                            <ButtonGroup
                                selectedIndex={this.state.trailerSealedIndx}
                                onPress={(index) => this.setState({ trailerSealedIndx: index })}
                                buttons={yesNo}
                                containerStyle={{ height: 50 }}
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text>Is Trailer Locked?</Text>
                            <ButtonGroup
                                selectedIndex={this.state.trailerLockedIndx}
                                onPress={(index) => this.setState({ trailerLockedIndx: index })}
                                buttons={yesNo}
                                containerStyle={{ height: 50 }}
                            />
                        </View>
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Are the trailer and materials free of signs of tampering? </Text>
                        <ButtonGroup
                            selectedIndex={this.state.materialsFreeIndex}
                            onPress={(index) => this.setState({ materialsFreeIndex: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Is Truck inside condition acceptable? (Visual Inspection free of contamination (pest, spill, off odors, etc.) </Text>
                        <ButtonGroup
                            selectedIndex={this.state.truckInsideIndx}
                            onPress={(index) => this.setState({ truckInsideIndx: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Are Product Condition (# damaged)/Pallet Condition (not broken, smelly, contaminated) Acceptable? </Text>
                        <ButtonGroup
                            selectedIndex={this.state.productCondtionIndx}
                            onPress={(index) => this.setState({ productCondtionIndx: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>{"Product Temperature (Check one random case per pallet at nose, mid and tail of load) Record all 3 temps. (FROZEN <10° F, REF. 32-40 deg°F); Cheese 45°F Max. Record 'Ambient' if Shelf Stable Materials."}</Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            value={this.state.noseProductTemp}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Nose'
                            onChangeText={(text) => this.setState({ noseProductTemp: text })}
                            placeholderTextColor={hintColor} />

                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            value={this.state.midProductTemp}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Mid'
                            onChangeText={(text) => this.setState({ midProductTemp: text })}
                            placeholderTextColor={hintColor} />

                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='number-pad'
                            returnKeyType="done"
                            value={this.state.tailProductTemp}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Tail'
                            onChangeText={(text) => this.setState({ tailProductTemp: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Visual Verification of Product - Do Quantity/Lot Codes Received Match BOL/P.O./Invoice? </Text>
                        <ButtonGroup
                            selectedIndex={this.state.vvOfProductIndx}
                            onPress={(index) => this.setState({ vvOfProductIndx: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>{"Allergen Verification: Note Allergen Content of items Received.  (Circle Appropriate and note specific allergen type when Tree Nuts (TN) and/or Shellfish (SH) is received) Note: Gluten Free is treated as an allergen:"} </Text>
                        <TouchableOpacity
                            onPress={() => { this.refs._selectMultiOptionModal.showProgramsTypes(this.state.allergenContent) }}
                        >
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ fontSize: 14, flex: 1, fontWeight: "bold", color: appGreyColor }}>Select allergen Content</Text>
                                <View style={{ flex: 1 }} />
                                <Icon name="edit" color={appGreyColor} size={24} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                            {
                                this.state.allergenContent.map((item, index) => {
                                    if (item.isSelecetd) {
                                        return (
                                            <Chip key={index} style={{ margin: 5 }}>{item.key}</Chip>
                                        )
                                    }
                                })
                            }
                        </View>
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>If Product Contains Allergens, Was it Allergen Tagged During Receiving?  </Text>
                        <ButtonGroup
                            selectedIndex={this.state.allergentaqggedIndx}
                            onPress={(index) => this.setState({ allergentaqggedIndx: index })}
                            buttons={yesNo}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>{"Was the Product Marked with Expiration Date, Where Appropriate (e.g. dairy)? Are days remaining before expiry adequate?"} </Text>
                        <ButtonGroup
                            selectedIndex={this.state.markedWithExpDateIndx}
                            onPress={(index) => this.setState({ markedWithExpDateIndx: index })}
                            buttons={acceptOrNot}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Inspection Summary (Check Appropriate) </Text>
                        <ButtonGroup
                            selectedIndex={this.state.inspectionSummaryIndx}
                            onPress={(index) => this.setState({ inspectionSummaryIndx: index })}
                            buttons={acceptHoldReject}
                            containerStyle={{ height: 50 }}
                        />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>Follow-up action if Hold or Reject: </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.followUpAction}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ followUpAction: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={[styles.round_white_bg_container]}>
                        <Text>{"Corrective Action Detail: (For all non-conformances above (No or unacceptable responses, record what the corrective action was, who performed it (name), and date performed)"} </Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.correctiveActionDetail}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ correctiveActionDetail: text })}
                            placeholderTextColor={hintColor} />
                    </View>

                    <View style={{ flexDirection: "row" }}>
                        <Button
                            title="Submit"
                            onPress={() => { this.submitForm() }}
                            containerStyle={{ margin: 5, flex: 1 }}
                            buttonStyle={{ backgroundColor: "green", marginEnd: 5 }}
                        />
                        <Button
                            title="Cancel"
                            onPress={() => { this.props.navigation.goBack() }}
                            containerStyle={{ margin: 5, flex: 1 }}
                            buttonStyle={{ backgroundColor: "red", marginEnd: 5 }}
                        />
                    </View>

                </ScrollView>
            </SafeAreaView>
        );
    }

    getSelectedAllergenContent() {
        var values = ""
        this.state.allergenContent.map(item => {
            if (item.isSelecetd) {
                values = values + item.key + ","
            }
        })
        return values;
    }

    submitForm() {
        let v1 = this.state.monitorName
        let v2 = this.state.time
        let v3 = this.state.InvoiceNo
        let v4 = this.state.itemName
        let v5 = this.state.supplierName

        let v6 = yesNo[this.state.SPApprovedIndex]

        let v7 = this.state.carrierName
        let v8 = this.state.truckLPlate
        let v08 = this.state.trailerLPlate
        let v9 = this.state.driverLInfo

        let v10 = yesNo[this.state.trailerSealedIndx]
        let v11 = yesNo[this.state.trailerLockedIndx]
        let v12 = yesNo[this.state.materialsFreeIndex]
        let v13 = yesNo[this.state.truckInsideIndx]
        let v14 = yesNo[this.state.productCondtionIndx]

        let v16 = yesNo[this.state.vvOfProductIndx]

        let v17 = this.getSelectedAllergenContent()

        let v18 = yesNo[this.state.allergentaqggedIndx]
        let v19 = acceptOrNot[this.state.markedWithExpDateIndx]
        let v20 = acceptHoldReject[this.state.inspectionSummaryIndx]

        let v21 = this.state.followUpAction
        let v22 = this.state.correctiveActionDetail

        let v23 = this.state.noseProductTemp
        let v24 = this.state.midProductTemp
        let v25 = this.state.tailProductTemp

        if (MyUtils.isEmptyString(v1) || MyUtils.isEmptyString(v2) || MyUtils.isEmptyString(v3) || MyUtils.isEmptyString(v4) ||
            MyUtils.isEmptyString(v5) || MyUtils.isEmptyString(v7) || MyUtils.isEmptyString(v8) || MyUtils.isEmptyString(v08) ||
            MyUtils.isEmptyString(v9) || MyUtils.isEmptyString(v17) || MyUtils.isEmptyString(v21) || MyUtils.isEmptyString(v22) ||
            MyUtils.isEmptyString(v23) || MyUtils.isEmptyString(v24) || MyUtils.isEmptyString(v25)) {
            MyUtils.showSnackbar("Please fill all required (*) fields", "")
            return;
        }

        let formData = {
            monitorName: v1,
            time: v2,
            InvoiceNo: v3,
            itemName: v4,
            supplierName: v5,
            SPApprovedIndex: v6,
            carrierName: v7,
            truckLPlate: v8,
            trailerLPlate: v08,
            driverLInfo: v9,
            trailerSealedIndx: v10,
            trailerLockedIndx: v11,
            materialsFreeIndex: v12,
            truckInsideIndx: v13,
            productCondtionIndx: v14,
            vvOfProductIndx: v16,
            allergenContentIndx: v17,
            allergentaqggedIndx: v18,
            markedWithExpDateIndx: v19,
            inspectionSummaryIndx: v20,

            followUpAction: v21,
            correctiveActionDetail: v22,

            noseProductTemp: v23,
            midProductTemp: v24,
            tailProductTemp: v25
        }

        this.setState({ isFormSubmitting: true })
        webHandler.submitTrcuckInspectionForm(formData, (responseJson) => {
            this.setState({ isFormSubmitting: false })
            MyUtils.showSnackbar("form submitted successfully", "")
            this.props.navigation.goBack()
        }, (error) => {
            MyUtils.showSnackbar(error, "")
            this.setState({ isFormSubmitting: false })
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
    round_white_bg_container: {
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        padding: 5,
        borderRadius: 5
    },

});

export default FormNo1;