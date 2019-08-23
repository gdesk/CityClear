<template>
  <div class="about">
    <b-container class="container">
      <b-row>
        <b-col>
          <img alt="City Clear logo" src="../assets/logo-about.png"> <br><br> 
            Vuoi rendere la tua città più attiva rispetto al problama del decoro urbano? <br><br><br>   
            Per decoro urbano intendiamo la qualificazione estetica e funzionale della nostra città assicurando adeguati livelli qualitativi 
            che garantiscano la piena fruibilità della stessa da parte dei cittadini e dei comuni stessi, in particolare per quanto riguarda strade, 
            beni pubblici, architettonici, artistici, storici, etc. <br>
            <h3>Lato cittadino</h3>
            Chiunque può creare il proprio profilo dal sito web, accessibile senza alcun problema da qualsiasi browser. Le segnalazioni possono 
            essere inviate dal sito attraverso la procedura guidata e il dispositivo associerà automaticamente le coordinate Gps e visualizzerà 
            la segnalazione sulla mappa. Ogni utente può inolre creare e/o partecipare a discussioni o ad eventi di volontariato organizzati, 
            in tal modo si avrà la possibilità di scambiarsi idee o informazioni su un forum comune nella community sia con altri cittadini sia 
            con il comune di interesse.
            In fine potrà oltre, che gestire il proprio profilo, partecipare ad una “gara a punti”, la quale prevede un punteggio. I punteggi 
            sono calcolati in base alle azioni compiute come la partecipazione ad un evento di volontariato oppure la creazione di una nuova segnalazione.
            In base ai punteggi raggiunti, sarà previsto un premio per incentivare la partecipazione.<br>
            <h3>Lato comune</h3>
            Qualsiasi comune, dopo averci contattati, può creare un proprio account atto a monitorare i punti caldi inseriti dai diversi cittadini, visualizzare
            i commenti e gli eventi proposti dai propri cittadini ed interagire con loro. Inoltre potrà monitorare l'adamnto della propria città grazie ad una 
            dashboard dedicata. 
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  export default {
  }
</script>
>

<style scoped lang="scss">
  .about{
    background: white;
    opacity: 0.8;
  }

  img {
    width: 15%;
    height: auto;
  }

  @media (max-width: 800px) {
    img {
      width: 30%;
      height: auto;
    }
   }

  @media (max-width: 600px) {
    img {
      width: 30%;
      height: auto;
    }
  }
</style>