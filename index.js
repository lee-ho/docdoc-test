import Vue from 'vue';
import axios from 'axios';

import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);


new Vue({
	el: '#app',
	data: {
		countries: ['Россия', 'не Россия'],
		deliveryOptions: [
			{
				name: 'delivery',
				label: 'Доставка'
			},
			{
				name: 'pickup',
				label: 'Самовывоз'
			}
		],
		secondStep: false,
		delivery: true,
		name: null,
		surname: null,
		phone: null,
		email: null,
		rerenderKey: 0,
		country: null,
		city: null,
		postCode: null,
		address: null,
		date: null,
		commentary: null,
		formErrors: [],
		formData: []
	},
	methods: {
		deliveryOptionClick(name) {
			if (name == 'delivery') {
				this.delivery = true
			} else if (name == 'pickup') {
				this.delivery = false
			}
		},
		nextStep() {
			if (this.name && this.surname && this.phone && this.email) {
				this.formData = [
					{name: this.name},
					{surname: this.surname},
					{phone: this.phone},
					{email: this.email}
				];
				this.secondStep = true;
				this.formErrors = [];
			} else {
				this.formErrors = [];
				if (!this.name) this.formErrors.push("Name is required!");
				if (!this.surname) this.formErrors.push("Surname is required!");
				if (!this.phone) this.formErrors.push("Phone is required!");
				if (!this.email) this.formErrors.push("Еmail is required!");
			}
		},
		firstStep() {
			this.secondStep = false
			this.rerenderKey +=1
		},
		onSubmit() {
			if (this.delivery) {
				if (this.country && this.city && this.postCode && this.address && this.date) {
				this.formData.push(
					{country: this.country},
					{city: this.city},
					{postCode: this.postCode},
					{address: this.address},
					{date: this.date},
					{commentary: this.commentary});
					this.axiosRequest();
				} else {
					this.formErrors = [];
					if (!this.country) this.formErrors.push("Country is required!");
					if (!this.city) this.formErrors.push("City is required!");
					if (!this.postCode) this.formErrors.push("Post code is required!");
					if (!this.address) this.formErrors.push("Address is required!");
					if (!this.date) this.formErrors.push("Date is required!");
				}
			} else {
				this.formData.push({commentary: this.commentary});
				this.axiosRequest();
			}
		},
		axiosRequest() {
			axios.post('/test.php', {}).then(function(result){
				if (result.data.success) {
					alert("Успешно отправлено.");
					window.location.reload();
				} else {
					alert("Ошибка, просьба повторить запрос позже.")
				}
			})
		}
	}
})



