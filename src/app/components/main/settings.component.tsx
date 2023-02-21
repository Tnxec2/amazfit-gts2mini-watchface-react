import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { WatchfaceContext } from '../../context';
import { Constant, IDevice } from '../../shared/constant';

const SettingsComponent = () => {

    const {device, setDevice} = useContext(WatchfaceContext)
    
    function saveDevice(d: IDevice): void {
        localStorage.setItem(Constant.DEVICE_KEY, JSON.stringify(
            {...d, countEditable: device.countEditable}));
        setDevice({...d, countEditable: device.countEditable});
    }

    const onChangeCountEditable = () => {
        localStorage.setItem(Constant.DEVICE_KEY, JSON.stringify({...device, countEditable: !device.countEditable}));
        setDevice({...device, countEditable: !device.countEditable})
    }

    return (
        <Card className="mt-3">
            <Card.Header>
                Device
            </Card.Header>
            <Card.Body>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="device" id="device_gts2mini" value="gts2mini" 
                checked={device.deviceId === Constant.devices.gts2minie.deviceId} onChange={() => saveDevice(Constant.devices.gts2minie)} />
                <label className="form-check-label">
                    {Constant.devices.gts2minie.title}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="device" id="device_bipu" value="bipu" 
                checked={device.deviceId === Constant.devices.bipu.deviceId} onChange={() => saveDevice(Constant.devices.bipu)} />
                <label className="form-check-label">
                    {Constant.devices.bipu.title}
                </label>
            </div>
            
            <div className="input-group" style={{ width: "max-content" }}>
                <span className="input-group-text" id="addon-wrapping">
                Images Count editable
                </span>
                <div className="input-group-text">
                <input
                    className="form-check-input mt-0"
                    type="checkbox"
                    checked={device.countEditable}
                    onChange={onChangeCountEditable}
                />
                </div>
                
            </div>
            </Card.Body>
        </Card>
    );
};

export default SettingsComponent;

export function getDeviceFromStorage(): IDevice {
    let device: IDevice = JSON.parse(localStorage.getItem(Constant.DEVICE_KEY))
    if (!device) device = Constant.devices.gts2minie
    return device
}
