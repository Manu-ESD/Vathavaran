sap.ui.define(
	[
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/ui/core/library",
		"sap/m/Dialog",
		"sap/m/Button",
		"sap/m/library",
		"sap/m/Text"
	],
	function(Controller, MessageToast, coreLibrary, Dialog, Button, mobileLibrary, Text) {
var weatherData;
var weatherObject={
	localtimeline: "",
	temp:"",
	humidity :"",
	type:"",
	icon:"",
	wind:""
};
return Controller.extend("weather.one.controller.App", {
    OnSubmit: function() {
    	
    	var Cityentered = this.getView().byId("City").getValue();
    	if(Cityentered==""){
    		MessageToast.show("Please Enter Valid City");
    	}
    	else{
        var sUrl = "https://api.weatherapi.com/v1/current.json?key=f5d0acc0de3c409faa3104430230108&q="+Cityentered;
        var oData;
        jQuery.ajax({
            url: sUrl,
            method: "GET",
            dataType: "json",
            success: function(data) {
                oData = data;
                // Use the data here
                console.log(oData);
                this.handleWeatherData(oData);
                MessageToast.show("submitted");
            }.bind(this),
            error: function(error) {
                // Handle the error here
                console.log(error);
                MessageToast.show("Error: Invalid City! Please enter Capital city");
            }
        });
    	}
    	
    },
    handleWeatherData: function(data) {
        weatherData = data;
        console.log(weatherData);
        weatherObject.localtimeline = weatherData.location.localtime;
        weatherObject.type = weatherData.current.condition.text;
        weatherObject.icon = weatherData.current.condition.icon;
        weatherObject.temp = weatherData.current.temp_c;
        weatherObject.humidity = weatherData.current.humidity;
        weatherObject.wind = weatherData.current.wind_kph;
        console.log(weatherObject);
        this.getView().byId("tempUI").setValue(weatherObject.temp);
        this.getView().byId("humidUI").setValue(weatherObject.humidity);
        this.getView().byId("windUI").setValue(weatherObject.wind);
        this.getView().byId("imgUI").setSrc("https:"+weatherObject.icon);
        this.getView().byId("typeUI").setHeader(weatherObject.type);
        this.getView().byId("timeUI").setSubheader(weatherObject.localtimeline);
        if(weatherObject.type.toLowerCase().includes("sunny")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/52/60/87/5260870354fe7b9e07ab21297643bb21.jpg");
        }else if(weatherObject.type.toLowerCase().includes("mist")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/f7/e8/bf/f7e8bf85544f807e4f5bd2e1131e424c.jpg");
        }else if(weatherObject.type.toLowerCase().includes("overcast")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/a7/c3/2d/a7c32df8b497aa9a81334656b7a6aac5.jpg");
        }else if(weatherObject.type.toLowerCase().includes("rain")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/3e/0e/c6/3e0ec621ea94f02d8c422b39acba3da2.jpg");
        }else if(weatherObject.type.toLowerCase().includes("cloud")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/94/d4/56/94d456f4047612a5a70ff06ede3f744b.jpg");
        }else if(weatherObject.type.toLowerCase().includes("clear")){
        	 this.getView().byId("BackUI").setBackgroundImage("https://i.pinimg.com/564x/ad/bc/3b/adbc3b87e59f49bb9316d06f25fedb6f.jpg");
        }else{
        	this.getView().byId("BackUI").setBackgroundImage("");
        }
        
    }
});

	});