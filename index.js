import Vue from 'vue'
import axios from 'axios'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

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
		formErrors: [],
		secondStep: false,
		rerenderKey: 0,

		formData: {
			delivery: true,
			name: null,
			surname: null,
			phone: null,
			email: null,
			postCode: null,
			address: null,
			country: null,
			city: null,
			date: null,
			commentary: null,
		}
	},

	methods: {
		toFirstStep() {
			this.secondStep = false
			this.rerenderKey += 1
		},

		toSecondStep() {
			if (!this.isFirstStepValid()) {
				this.formErrors = []

				if (!this.formData.name) this.formErrors.push("Name is required!")
				if (!this.formData.surname) this.formErrors.push("Surname is required!")
				if (!this.formData.phone) this.formErrors.push("Phone is required!")
				if (!this.formData.email) this.formErrors.push("Еmail is required!")

				return
			}

			this.secondStep = true
			this.formErrors = []
		},

		isFirstStepValid() {
			return this.formData.name &&
				this.formData.surname &&
				this.formData.phone &&
				this.formData.email
		},

		onDeliveryOptionSelect(name) {
			this.formData.delivery = (name == 'delivery')
		},

		onSubmit() {
			if (!this.isSecondStepValid()) {
				this.formErrors = []
				if (!this.formData.country) this.formErrors.push("Country is required!")
				if (!this.formData.city) this.formErrors.push("City is required!")
				if (!this.formData.postCode) this.formErrors.push("Post code is required!")
				if (!this.formData.address) this.formErrors.push("Address is required!")
				if (!this.formData.date) this.formErrors.push("Date is required!")
				return
			}

			this.submitForm()
		},

		isSecondStepValid() {
			if (!this.formData.delivery) return true
			return this.formData.country &&
				this.formData.city &&
				this.formData.postCode &&
				this.formData.address &&
				this.formData.date
		},

		submitForm() {
			axios.post('/test.php', this.formData).then(result => {
				if (result.data.success) {
					alert("Успешно отправлено.")
					window.location.reload()
				} else {
					alert("Ошибка, просьба повторить запрос позже.")
				}
			})
		}
	}
})
