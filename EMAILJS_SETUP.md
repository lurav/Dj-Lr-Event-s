# Configuration EmailJS pour le Formulaire de Contact

## 📧 Qu'est-ce qu'EmailJS ?

EmailJS vous permet de recevoir les messages du formulaire de contact directement dans votre boîte email, **sans avoir besoin d'un serveur backend**. C'est gratuit jusqu'à 200 emails/mois.

---

## 🚀 Étapes de Configuration (5 minutes)

### 1. Créer un Compte EmailJS

1. Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
2. Cliquez sur **"Sign Up"** (Inscription gratuite)
3. Créez votre compte avec votre email

### 2. Ajouter un Service Email

1. Une fois connecté, allez dans **"Email Services"**
2. Cliquez sur **"Add New Service"**
3. Choisissez votre fournisseur d'email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre email
5. **Notez votre SERVICE_ID** (ex: `service_abc123`)

### 3. Créer un Template d'Email

1. Allez dans **"Email Templates"**
2. Cliquez sur **"Create New Template"**
3. Configurez le template comme ceci :

**Subject (Sujet):**
```
Nouvelle demande de {{user_name}} - Dj Lr Event's
```

**Content (Contenu):**
```
Nouvelle demande de contact depuis le site Dj Lr Event's

Nom: {{user_name}}
Email: {{user_email}}
Téléphone: {{user_phone}}

Message:
{{message}}
```

4. **Notez votre TEMPLATE_ID** (ex: `template_xyz789`)

### 4. Obtenir votre Clé Publique

1. Allez dans **"Account"** → **"General"**
2. Trouvez votre **Public Key** (ex: `abcdefgh123456`)
3. **Copiez cette clé**

### 5. Mettre à Jour le Code

Ouvrez le fichier `script.js` et remplacez les 3 valeurs :

**Ligne 119 :**
```javascript
emailjs.init('YOUR_PUBLIC_KEY'); // Remplacez par votre Public Key
```

**Ligne 137 :**
```javascript
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

**Exemple avec de vraies valeurs :**
```javascript
emailjs.init('abcdefgh123456');
emailjs.sendForm('service_abc123', 'template_xyz789', this)
```

---

## ✅ Tester le Formulaire

1. Ouvrez `index.html` dans votre navigateur
2. Remplissez le formulaire de contact
3. Cliquez sur **"Envoyer"**
4. Vous devriez voir : **"✓ Message envoyé avec succès !"**
5. Vérifiez votre boîte email - vous devriez avoir reçu le message !

---

## 🔧 Dépannage

### Le formulaire ne s'envoie pas ?

1. **Vérifiez la console du navigateur** (F12 → Console)
2. Assurez-vous d'avoir bien remplacé les 3 valeurs dans `script.js`
3. Vérifiez que votre Service Email est bien connecté dans EmailJS
4. Vérifiez que le template existe et est actif

### Erreur "Invalid Public Key" ?

- Vous n'avez pas remplacé `YOUR_PUBLIC_KEY` dans `script.js`
- Ou la clé copiée est incorrecte

### Les emails n'arrivent pas ?

- Vérifiez vos **spams/courrier indésirable**
- Vérifiez que le service email est bien configuré dans EmailJS
- Testez l'envoi depuis le dashboard EmailJS directement

---

## 📊 Limites du Plan Gratuit

- **200 emails/mois** (largement suffisant pour démarrer)
- Si vous dépassez, vous pouvez passer au plan payant (à partir de 7$/mois)

---

## 🎯 Résumé Rapide

1. Créer compte sur emailjs.com
2. Ajouter service email (Gmail, etc.)
3. Créer template d'email
4. Copier Public Key, Service ID, Template ID
5. Remplacer dans `script.js` lignes 119 et 137
6. Tester !

**Besoin d'aide ?** Consultez la documentation : [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
