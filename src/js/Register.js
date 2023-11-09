import { renderHeaderFooter } from './utils.mjs';
import RegistrationForm from './components/RegistrationForm.svelte';
import WelcomeModal from './components/WelcomeModal.svelte';

new RegistrationForm({
    target: document.querySelector('.registration-form')
})
renderHeaderFooter();
WelcomeModal();

