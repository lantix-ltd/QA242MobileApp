import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { CheckBox, ButtonGroup, Button } from 'react-native-elements'
import Modal from "react-native-modal";
import { appPinkColor } from "../../utils/AppStyles";
import WebHandler from "../../data/remote/WebHandler"
import MyUtils from "../../utils/MyUtils";
import DateTimePicker from "react-native-modal-datetime-picker";

const yesNo = ["Yes", "No"]
const releaseHold = ["Release", "Hold"]
const webHandler = new WebHandler()

class FormNo2 extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: "PPC-7 Shipping Inspection",
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            monitorName: "",
            checkIntime: "00:00:00",
            soNo: "",
            itemName: "",
            customerName: "",
            carrierName: "",
            truckTrailerLPlate: "",
            driverLInfo: "",
            truckSetTemp: "",
            truckReadingTemp: "",
            truckCondiAcceptable: 0,
            frozenProductTemp: "",
            refrigeratedProductTemp: "",
            firstProductSurfaceTemp: "",
            lastProductSurfaceTemp: "",
            productCondiAcceptable: 0,
            signOfTemparing: 0,
            isSecured: 0,
            sealNo: "",
            isBOL: 0,
            inspectionSummary: 0,
            checkOutTime: "00:00:00",
            followUpAction: "",
            correctiveAction: "",
            isFormSubmitting: false,
            isCheckInTimePickerVisible: false,
            isCheckOutTimePickerVisible: false,
        }
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

    handleCheckInTime(date) {
        this.setState({ isCheckInTimePickerVisible: false })
        var d = new Date(date)
        this.setState({ checkIntime: d.toLocaleTimeString() })
    }

    handleCheckOutTime(date) {
        this.setState({ isCheckOutTimePickerVisible: false })
        var d = new Date(date)
        this.setState({ checkOutTime: d.toLocaleTimeString() })
    }

    render() {
        const hintColor = "#ccc"
        return (
            <ScrollView style={styles.container}>

                <DateTimePicker
                    isVisible={this.state.isCheckInTimePickerVisible}
                    mode={"time"}
                    date={new Date()}
                    onConfirm={(date) => this.handleCheckInTime(date)}
                    onCancel={() => this.setState({ isCheckInTimePickerVisible: false })}
                />

                <DateTimePicker
                    isVisible={this.state.isCheckOutTimePickerVisible}
                    mode={"time"}
                    date={new Date()}
                    onConfirm={(date) => this.handleCheckOutTime(date)}
                    onCancel={() => this.setState({ isCheckOutTimePickerVisible: false })}
                />

                {this.renderLoadingDialog()}

                <View style={[styles.round_white_bg_container, { marginTop: 10 }]}>
                    <Text> Monitor Name / Initials: </Text>
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
                    <Text>Check In Time: </Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ isCheckInTimePickerVisible: true }) }}
                    >
                        <Text style={{ padding: 5, fontSize: 16, color: "black" }}>{this.state.checkIntime} </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>Sales Order Number (SO#): </Text>
                    <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        value={this.state.soNo}
                        numberOfLines={1}
                        multiline={false}
                        placeholder='* Type here'
                        onChangeText={(text) => this.setState({ soNo: text })}
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
                    <Text>Customer Name: </Text>
                    <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        value={this.state.customerName}
                        numberOfLines={1}
                        multiline={false}
                        placeholder='* Type here'
                        onChangeText={(text) => this.setState({ customerName: text })}
                        placeholderTextColor={hintColor} />
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
                    <Text>Truck License Plate / Trailer License Plate: </Text>
                    <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        value={this.state.truckTrailerLPlate}
                        numberOfLines={1}
                        multiline={false}
                        placeholder='* Type here'
                        onChangeText={(text) => this.setState({ truckTrailerLPlate: text })}
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
                        <Text>Trailer set temparture</Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.truckSetTemp}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ truckSetTemp: text })}
                            placeholderTextColor={hintColor} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>Trailer reading temparture</Text>
                        <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType='default'
                            returnKeyType="done"
                            value={this.state.truckReadingTemp}
                            numberOfLines={1}
                            multiline={false}
                            placeholder='* Type here'
                            onChangeText={(text) => this.setState({ truckReadingTemp: text })}
                            placeholderTextColor={hintColor} />
                    </View>
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>Is Truck inside condition acceptable? (Visual Inspection free of contamination (pest, spill, off odors, etc.) </Text>
                    <ButtonGroup
                        selectedIndex={this.state.truckCondiAcceptable}
                        onPress={(index) => this.setState({ truckCondiAcceptable: index })}
                        buttons={yesNo}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Truck temp between 10°F to -5°F For Frozen Product OR 33°F - 38°F for Refirgerated Product?Record air temp. measured by pointing IR gun at back wall inside trailer before loading."}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                returnKeyType="done"
                                value={this.state.frozenProductTemp}
                                numberOfLines={1}
                                multiline={false}
                                placeholder='Frozen °F'
                                onChangeText={(text) => this.setState({ frozenProductTemp: text })}
                                placeholderTextColor={hintColor} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                returnKeyType="done"
                                value={this.state.refrigeratedProductTemp}
                                numberOfLines={1}
                                multiline={false}
                                placeholder='Refrigerated °F'
                                onChangeText={(text) => this.setState({ refrigeratedProductTemp: text })}
                                placeholderTextColor={hintColor} />
                        </View>
                    </View>
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Is Product Surface Temp. of 1st and last pallet within Refrigerated or Frozen specifications mentioned above?  Monitor by pointing IR Gun at randomly selected case from first and last pallet in load.  Record surface temp. measurements."}</Text>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                returnKeyType="done"
                                value={this.state.firstProductSurfaceTemp}
                                numberOfLines={1}
                                multiline={false}
                                placeholder='First °F'
                                onChangeText={(text) => this.setState({ firstProductSurfaceTemp: text })}
                                placeholderTextColor={hintColor} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType='default'
                                returnKeyType="done"
                                value={this.state.lastProductSurfaceTemp}
                                numberOfLines={1}
                                multiline={false}
                                placeholder='Last °F'
                                onChangeText={(text) => this.setState({ lastProductSurfaceTemp: text })}
                                placeholderTextColor={hintColor} />
                        </View>
                    </View>
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Are Product Condition (# damaged)/Pallet Condition (not broken, smelly, contaminated) Acceptable?"} </Text>
                    <ButtonGroup
                        selectedIndex={this.state.productCondiAcceptable}
                        onPress={(index) => this.setState({ productCondiAcceptable: index })}
                        buttons={yesNo}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Are the trailer and materials free of signs of tampering?"} </Text>
                    <ButtonGroup
                        selectedIndex={this.state.signOfTemparing}
                        onPress={(index) => this.setState({ signOfTemparing: index })}
                        buttons={yesNo}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Is Trailer Secure (Sealed or Locked)?"} </Text>
                    <ButtonGroup
                        selectedIndex={this.state.isSecured}
                        onPress={(index) => this.setState({ isSecured: index })}
                        buttons={yesNo}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>If Sealed, Enter Seal #</Text>
                    <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        value={this.state.sealNo}
                        numberOfLines={1}
                        multiline={false}
                        placeholder='* Type here'
                        onChangeText={(text) => this.setState({ sealNo: text })}
                        placeholderTextColor={hintColor} />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Visual Verification of Product - Does Quantity/Lot Codes Match BOL/P.O.?"} </Text>
                    <ButtonGroup
                        selectedIndex={this.state.isBOL}
                        onPress={(index) => this.setState({ isBOL: index })}
                        buttons={yesNo}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>{"Inspection Summary (Check appropriate)"} </Text>
                    <ButtonGroup
                        selectedIndex={this.state.inspectionSummary}
                        onPress={(index) => this.setState({ inspectionSummary: index })}
                        buttons={releaseHold}
                        containerStyle={{ height: 50 }}
                    />
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>Check Out Time: </Text>
                    <TouchableOpacity
                        onPress={() => { this.setState({ isCheckOutTimePickerVisible: true }) }}
                    >
                        <Text style={{ padding: 5, fontSize: 16, color: "black" }}>{this.state.checkOutTime} </Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.round_white_bg_container]}>
                    <Text>Follow-up action if Hold </Text>
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
                    <Text>Corrective Actions: </Text>
                    <TextInput style={{ backgroundColor: "#FFF", textAlignVertical: "top" }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType='default'
                        returnKeyType="done"
                        value={this.state.correctiveAction}
                        numberOfLines={1}
                        multiline={false}
                        placeholder='* Type here'
                        onChangeText={(text) => this.setState({ correctiveAction: text })}
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
        )
    }

    submitForm() {
        this.setState({ isFormSubmitting: true })

        let v1 = yesNo[this.state.truckCondiAcceptable]
        let v2 = yesNo[this.state.productCondiAcceptable]
        let v3 = yesNo[this.state.signOfTemparing]
        let v4 = yesNo[this.state.isSecured]
        let v5 = yesNo[this.state.isBOL]
        let v6 = releaseHold[this.state.inspectionSummary]

        let formData = {
            monitorName: this.state.monitorName,
            checkIntime: this.state.checkIntime,
            soNo: this.state.soNo,
            itemName: this.state.itemName,
            customerName: this.state.customerName,
            carrierName: this.state.carrierName,
            truckTrailerLPlate: this.state.truckTrailerLPlate,
            driverLInfo: this.state.driverLInfo,
            truckSetTemp: this.state.truckSetTemp,
            truckReadingTemp: this.state.truckReadingTemp,
            truckCondiAcceptable: v1,
            frozenProductTemp: this.state.frozenProductTemp,
            refrigeratedProductTemp: this.state.refrigeratedProductTemp,
            firstProductSurfaceTemp: this.state.firstProductSurfaceTemp,
            lastProductSurfaceTemp: this.state.lastProductSurfaceTemp,
            productCondiAcceptable: v2,
            signOfTemparing: v3,
            isSecured: v4,
            sealNo: this.state.sealNo,
            isBOL: v5,
            inspectionSummary: v6,
            checkOutTime: this.state.checkOutTime,
            followUpAction: this.state.followUpAction,
            correctiveAction: this.state.correctiveAction
        }

        webHandler.submitShippingInspectionForm(formData, (responseJson) => {
            this.setState({ isFormSubmitting: false })
            this.props.navigation.goBack()
        }, error => {
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

export default FormNo2;