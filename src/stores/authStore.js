import {ref, reactive} from 'vue';
import router from '../router/index';
import {defineStore} from 'pinia';



const authStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem('isAuthenticated'));
    let user = ref({
        fullName:'Moumita Zaman',
        email:'admin@test.com',
        age:'33',
        phone:'01722148628',
        password:'123456',
        image:'https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1401&q=80'
        
    });
    

    const login = (email, password) => {
        if(email == "admin@test.com" && password == "123456"){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
           // todoStore().action.fetch();
            router.push('/dashboard');
        }
        if(JSON.parse(localStorage.getItem('user')) != null)
            user.value = JSON.parse(localStorage.getItem('user'));

        if(user.value.email == email && user.value.password == password){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
           // todoStore().action.fetch();
            router.push('/dashboard');
        }
        else{
            console.log('Username or Password is incorrect');
        }

    };

    const register = (formData) => {
        if(localStorage.setItem('user', JSON.stringify(formData))){
            localStorage.setItem('isAuthenticated',true);
            isAuthenticated.value = true;
            //todoStore().action.fetch();
            return formData;
        }

        router.push('/');

    };

    const profile = (profileData) => {
        localStorage.setItem('user', JSON.stringify(profileData));
        user.value=profileData;
      
        router.push('/profile');
       
    };

    const logout = () => {
        localStorage.setItem('isAuthenticated',false);
        isAuthenticated.value = false;
        localStorage.setItem('user', null);
        user.value = null;
        router.push('/');
    };

    return {isAuthenticated,user,profile, register, login, logout};
});

export default authStore;