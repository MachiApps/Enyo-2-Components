/*
Copyright (c) 2012, MachiApps
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


enyo.kind({ name: "KeypadButton",
	kind: "onyx.Button",
	classes: "keypad-button"
});

enyo.kind({ name: "PinEntry",
	published: {
		pw: '0000',
		accessGrantedDelay: 500
	},
	events: {
		onOpen: ""
	},
	components: [
		{content: "Enter PIN", classes: "header-text"},
		{kind: "onyx.Groupbox", style: "min-width:300px; height: 42px; text-align: center;", components: [
			{content: "", style: "height: 42px;", name: "numPadInput"}
		]},
		{defaultKind: "KeypadButton", style: "margin-top: 10px; text-align: center;", components: [
			{content: "1", ontap: "tap1"},
			{content: "2", ontap: "tap2"},
			{content: "3", ontap: "tap3"}
		]},
		{defaultKind: "KeypadButton", style: "margin-top: 10px; text-align: center;", components: [
			{content: "4", ontap: "tap4"},
			{content: "5", ontap: "tap5"},
			{content: "6", ontap: "tap6"}
		]},
		{defaultKind: "KeypadButton", style: "margin-top: 10px; text-align: center;", components: [
			{content: "7", ontap: "tap7"},
			{content: "8", ontap: "tap8"},
			{content: "9", ontap: "tap9"}
		]},
		{defaultKind: "KeypadButton", style: "margin-top: 10px; text-align: center;", components: [
			{content: "0", ontap: "tap0"},
			{content: "<<", ontap: "tapDel", style: "background-color: Red; color: white; width: 190px;"}
		]}
	],
	numLen: function(num, length) {
		var r = "" + num;
		while (r.length < length) {
			r = "0" + r;
		}
		return r;
	},
	openApp: function(){
		setTimeout(enyo.bind(this,function(){
			this.doOpen();
		}), this.accessGrantedDelay);
	},
	uNum: function(){
		switch (this.bIn.length){
			case 0:
				this.$.numPadInput.setContent("");
			break;
			case 1:
				this.$.numPadInput.setContent("*      ");
			break;
			case 2:
				this.$.numPadInput.setContent("* *    ");
			break;
			case 3:
				this.$.numPadInput.setContent("* * *  ");
			break;
			case 4:
				this.$.numPadInput.setContent("* * * *");
			break;
		}
		this.$.numPadInput.applyStyle("color", "#197BD1");
		this.$.numPadInput.applyStyle("font-style", "bold");
		this.$.numPadInput.applyStyle("font-size", "52px");
		this.$.numPadInput.applyStyle("letter-spacing", "15px");
		if (this.bIn == this.numLen(this.pw, 4)){
				this.$.numPadInput.setContent("Access Granted!");
				this.$.numPadInput.applyStyle("font-size", "35px");
				this.$.numPadInput.applyStyle("letter-spacing", "0px");
				this.openApp();
			} else if (this.bIn.length>=4){
			this.$.numPadInput.applyStyle("color", "red");
		}
		
	},
	bIn: "",
	tap1: function(){
		this.bIn += '1';
		this.uNum();
	},
	tap2: function(){
		this.bIn += '2';
		this.uNum();
	},
	tap3: function(){
		this.bIn += '3';
		this.uNum();
	},
	tap4: function(){
		this.bIn += '4';
		this.uNum();
	},
	tap5: function(){
		this.bIn += '5';
		this.uNum();
	},
	tap6: function(){
		this.bIn += '6';
		this.uNum();
	},
	tap7: function(){
		this.bIn += '7';
		this.uNum();
	},
	tap8: function(){
		this.bIn += '8';
		this.uNum();
	},
	tap9: function(){
		this.bIn += '9';
		this.uNum();
	},
	tap0: function(){
		this.bIn += '0';
		this.uNum();
	},
	tapDel: function(){
		this.bIn = this.bIn.substring(0, this.bIn.length-1);
		this.uNum();
	}
});