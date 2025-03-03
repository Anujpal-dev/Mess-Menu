/* script.js */
const dailyMenu = {
    monday: {
        breakfast: "Poori sabzi, chai",
        lunch: "Aalu Pyaz ki sabji, Uraad Daal,Chawal, Roti,Salad",
        snacks: "Samosa, Chai",
        dinner: "Aalu Gobhi, Arhar Dal, Chawal, Roti"
    },
    tuesday: {
        breakfast: "Chola ,Poori, Chai",
        lunch: "Kohda ki sabji,Moong Dal,Chawal, Roti",
        snacks: "Aalu Chana , Chai",
        dinner: "Matar ka chola, Chawal, Roti,Salad"
    },
    wednesday: {
        breakfast: "Suji ka halwa",
        lunch: "Aalu tamatar,Masoor dal,chawal,roti, Salad",
        snacks: "Aalu Pakodi, Chai",
        dinner: "Litti Chokha, Dal Chawal"
    },
    thursday: {
        breakfast: "Methi Ki poori,Chatni",
        lunch: "Aalu Methi ki sabji,Moong Dal,Chawal,Roti,Aachar",
        snacks: "Longlaata",
        dinner: "Aalu Foolgobhi ki sabji,Urad Daal,Chawal,Roti,salad"
    },
    friday: {
        breakfast: "Poori,Sabji,Chai",
        lunch: "Mix Veg Dry,Arhar Dal,Chawal,Roti,",
        snacks: "Samosa,Chai",
        dinner: "Kadi,chawal,roti"
    },
    saturday: {
        breakfast: "Chana Ki Ghughri,Chai",
        lunch: "Aalu Matar ki Sabji,Moong Dal Chawal,Roti, salad",
        snacks: "Pyaz Ki pakodi,Chai",
        dinner: "Soyabean Aalu Ki Sabji,Urad dal,Chawal,Roti"
    },
    sunday: {
        breakfast: "Chaumean,Chai",
        lunch: "Kabooli Chola,Chawal,Poori,Gulab Jamun",
        snacks: "3 Banana",
        dinner: "Dal,Chawal,Aachar"
    }
};

const menuDiv = document.getElementById('menu');
const circle = document.getElementById('circle');
let recognition;

function getSpecificMeal(day, mealType) {
    const meal = dailyMenu[day]?.[mealType];
    return meal ? `${mealType.toUpperCase()}: ${meal}` : "Menu not available.";
}

function startListening() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-IN';

    circle.classList.add('listening');
    recognition.start();

    recognition.onstart = () => {
        circle.textContent = 'Listening...';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        circle.textContent = 'Processing...';
        console.log('Transcript:', transcript);
        const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

        if (transcript.includes('breakfast')) {
            const response = getSpecificMeal(today, 'breakfast');
            menuDiv.innerHTML = response;
            speak(response);
        } else if (transcript.includes('lunch')) {
            const response = getSpecificMeal(today, 'lunch');
            menuDiv.innerHTML = response;
            speak(response);
        } else if (transcript.includes('snacks')) {
            const response = getSpecificMeal(today, 'snacks');
            menuDiv.innerHTML = response;
            speak(response);
        } else if (transcript.includes('dinner')) {
            const response = getSpecificMeal(today, 'dinner');
            menuDiv.innerHTML = response;
            speak(response);
        } else {
            const response = "Sorry, I didn't understand. Try asking for breakfast, lunch, snacks, or dinner.";
            menuDiv.innerHTML = response;
            speak(response);
        }
    };

    recognition.onerror = (event) => {
        circle.textContent = 'Error! Try again.';
        console.error('Speech recognition error', event);
    };

    recognition.onend = () => {
        circle.classList.remove('listening');
        circle.textContent = 'Listening...';
    };
}

function stopListening() {
    if (recognition) {
        recognition.stop();
        circle.classList.remove('listening');
        circle.textContent = 'Stopped';
    }
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; // Adjust speed if needed
    utterance.lang = 'hi-IN'; // Hindi language

    // Get available voices and set a male Hindi voice
    const voices = window.speechSynthesis.getVoices();
    const hindiMaleVoice = voices.find(voice => voice.lang === 'hi-IN' && voice.name.toLowerCase().includes('male'));

    if (hindiMaleVoice) {
        utterance.voice = hindiMaleVoice;
    } else {
        console.warn('Hindi male voice not found, using default Hindi voice.');
    }

    window.speechSynthesis.speak(utterance);
}

// Ensure voices are loaded before calling speak()
window.speechSynthesis.onvoiceschanged = () => {
    console.log("Voices updated!");
};
