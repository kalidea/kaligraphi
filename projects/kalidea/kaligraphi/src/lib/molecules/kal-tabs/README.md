# TAB PANEL

####PURPOSE

````html
<kal-tab-group>

  <kal-tab label="Header 1" selected>
    Body 1
  </kal-tab>
  
  <kal-tab label="Header 2" disabled>
    Body 2
  <kal-tab>
  
  <kal-tab label="Header 3">
    Body 3
  <kal-tab>

</kal-tab-group>
````

####SPECIFICATIONS

* Doit afficher les onglets en fonction du ng-content
* Doit bloquer le clic sur les onglets désactivé
* Doit sélectionner l'onglet par défaut
* Doit émettre l'onglet sélectionné lorsque l'on clique dessus
