enyo.kind({
	name: "BigCalPicker",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "calendarSelector", name: "datePicker1", onSelected: "updateDate", pickersStyled: true,  classes: "enyo-fit", style :"height: 500px; width: 500px", minYear: 2010, maxYear: 2015}
		]}
	],
	create: function() {
   		this.inherited(arguments);
   		
	},
	updateDate: function(inSender, d){
		console.log(d.month + " " + d.day + ", " + d.year);
	}
});

enyo.kind({
	name: "SmallCalPicker",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "calendarSelector", name: "datePicker1", onSelected: "updateDate", classes: "enyo-fit", style :"height: 300px; width: 300px", minYear: 2010, maxYear: 2015}
		]}
	],
	create: function() {
   		this.inherited(arguments);
   		
	},
	updateDate: function(inSender, d){
		console.log(d.month + " " + d.day + ", " + d.year);
	}
});