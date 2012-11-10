enyo.kind({ name: "Cal", 
	components: [
		{content: "<", ontap: "prevMonth", style: "display: inline-block;"},
		{kind: "DatePicker", onSelect: "dPickerChanged", style: "display: inline-block;"},
		{content: ">", ontap: "nextMonth", style: "display: inline-block;"},
		{kind: "CalendarSelector", onSelect: "onCalSelect"},
		{name: "dateText"}
	],
	onCalSelect: function(inSender, inEvent){
		this.$.datePicker.setValue(inEvent.value);
		this.$.dateText.setContent(inEvent.value);
	},
	dPickerChanged: function(inSender, inEvent){
		this.$.calendarSelector.setValue(inEvent.value);
		this.$.dateText.setContent(inEvent.value);
	},
	nextMonth: function(){
		this.$.calendarSelector.nextMonth();
	},
	prevMonth: function(){
		this.$.calendarSelector.prevMonth();
	}
});