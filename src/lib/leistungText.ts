// Praktische Hinweise je Leistung (Seiten /leistung/<slug>/). Bewusst ohne Aussagen zu Kosten und Kassen:
// Die stehen mit Normzitat in den Ratgebern (guide = Slug aus ratgeber.ts).
export const LEISTUNG_TEXT: Record<string, { intro: string; tipps: string[]; guide?: string }> = {
  hausbesuch: {
    intro: 'Wer das Haus kaum verlassen kann, muss nicht ins Geschäft. Viele Sanitätshäuser kommen zum Ausmessen, Anpassen und Einweisen nach Hause oder ins Pflegeheim, etwa für Kompressionsstrümpfe, Rollstuhl, Pflegebett oder Inkontinenzversorgung.',
    tipps: [
      'Fragen Sie am Telefon, ob Ihr Ort im Einzugsgebiet liegt und wann ein Termin frei ist.',
      'Legen Sie Rezept, Versichertenkarte und, falls vorhanden, den Bescheid über den Pflegegrad bereit.',
      'Planen Sie Platz ein: Für ein Pflegebett oder einen Rollstuhl schaut sich der Techniker auch Türen, Flur und Bad an.',
    ],
    guide: 'pflegebett-beantragen-mieten',
  },
  'lymph-flachstrick': {
    intro: 'Bei Lymphödem und Lipödem reicht ein normaler Kompressionsstrumpf oft nicht. Flachstrick ist fester, hat eine Naht und wird nach Maß gefertigt. Er drückt gleichmäßiger und schneidet in Hautfalten weniger ein.',
    tipps: [
      'Lassen Sie möglichst morgens oder direkt nach der Lymphdrainage messen, wenn die Schwellung am geringsten ist.',
      'Fragen Sie nach Erfahrung mit Flachstrick und nach einem separaten Raum zum Anmessen.',
      'Fragen Sie, welche Anziehhilfen das Haus zeigt. Flachstrick ist schwerer anzuziehen als ein Rundstrick-Strumpf.',
    ],
    guide: 'kompressionsstruempfe-stuetzstruempfe',
  },
  kompressionsstruempfe: {
    intro: 'Medizinische Kompressionsstrümpfe werden nach Maß Ihrer Beine ausgewählt oder gefertigt. Anders als Stützstrümpfe aus der Drogerie haben sie einen festgelegten Druck, der vom Knöchel nach oben abnimmt. Gute Anpassung im Sanitätshaus entscheidet darüber, ob der Strumpf hilft oder einschneidet.',
    tipps: [
      'Gehen Sie morgens zum Anmessen. Im Laufe des Tages schwellen die Beine an und die Maße stimmen nicht mehr.',
      'Fragen Sie nach Anziehhilfen wie Gleitsocke oder Strumpfanzieher, wenn Ihnen das Anziehen schwerfällt.',
      'Waschen Sie die Strümpfe so, wie es der Hersteller angibt. Dann behalten sie ihren Druck länger.',
      'Drückt oder rutscht der Strumpf, gehen Sie zurück. Das Sanitätshaus passt nach.',
    ],
    guide: 'kompressionsstruempfe-stuetzstruempfe',
  },
  brustprothetik: {
    intro: 'Nach einer Brustoperation helfen spezialisierte Fachberaterinnen bei der Auswahl von Brustprothese, Prothesen-BH und Badeanzug. Direkt nach der OP gibt es meist eine leichte Erstversorgung, nach dem Abheilen eine passende Silikonprothese.',
    tipps: [
      'Fragen Sie nach einer Fachberaterin und einem ungestörten Raum. Viele Häuser vergeben dafür feste Termine.',
      'Bringen Sie ein enges Oberteil mit, um den Sitz der Prothese zu prüfen.',
      'Fragen Sie auch nach Bademode und Sport-BHs. Nicht jedes Haus führt beides.',
    ],
  },
  kinderversorgung: {
    intro: 'Kinder wachsen, deshalb müssen Rollstuhl, Therapiestuhl, Orthesen und Gehhilfen öfter angepasst werden als bei Erwachsenen. Sanitätshäuser mit Kinder-Reha haben dafür eigene Techniker und Erfahrung mit Therapeuten und Kinderärzten.',
    tipps: [
      'Fragen Sie Physio- oder Ergotherapeuten Ihres Kindes, mit welchem Sanitätshaus sie gute Erfahrungen haben.',
      'Fragen Sie, ob das Haus zu Ihnen nach Hause oder in Kita und Schule kommt.',
      'Klären Sie vorab, wie schnell Anpassungen bei Wachstum möglich sind.',
    ],
  },
  'rollstuhl-werkstatt': {
    intro: 'Rollstühle, Elektrorollstühle und Scooter brauchen Wartung und manchmal schnelle Reparaturen. Sanitätshäuser mit Reha-Technik haben eine eigene Werkstatt und oft einen Außendienst, der zu Ihnen kommt.',
    tipps: [
      'Hat die Krankenkasse den Rollstuhl bezahlt, fragen Sie zuerst bei der Kasse, welcher Betrieb für Reparaturen zuständig ist.',
      'Fragen Sie, ob es während der Reparatur einen Ersatzrollstuhl gibt.',
      'Notieren Sie Hersteller, Modell und Seriennummer. Das steht meist auf einem Aufkleber am Rahmen.',
    ],
  },
  rollator: {
    intro: 'Ein Rollator gibt Sicherheit beim Gehen und eine Sitzgelegenheit unterwegs. Im Sanitätshaus können Sie verschiedene Modelle ausprobieren und die Griffe auf Ihre Größe einstellen lassen.',
    tipps: [
      'Die Griffe sitzen richtig, wenn sie bei locker hängenden Armen etwa auf Höhe Ihrer Handgelenke sind.',
      'Für die Wohnung gibt es schmale Modelle, für draußen solche mit größeren Rädern. Probieren Sie beides aus.',
      'Achten Sie auf das Gewicht, wenn Sie den Rollator ins Auto oder die Treppe hochtragen müssen.',
      'Prüfen Sie die Bremsen vor jeder längeren Strecke. Das Sanitätshaus stellt sie nach.',
    ],
    guide: 'rollator-auf-rezept',
  },
  pflegebett: {
    intro: 'Ein Pflegebett lässt sich in der Höhe verstellen, hat ein verstellbares Kopf- und Fußteil und oft Seitengitter. Es erleichtert das Aufstehen und schont den Rücken pflegender Angehöriger. Sanitätshäuser liefern und bauen es auf.',
    tipps: [
      'Messen Sie den Raum aus. Das Bett sollte von beiden Seiten zugänglich sein.',
      'Fragen Sie nach dem Liefertermin. Bei Entlassung aus dem Krankenhaus muss es oft schnell gehen.',
      'Lassen Sie sich die Bedienung und die Seitengitter beim Aufbau zeigen.',
    ],
    guide: 'pflegebett-beantragen-mieten',
  },
  bandagen: {
    intro: 'Bandagen stützen Knie, Sprunggelenk, Handgelenk oder Rücken. Sie wirken nur, wenn sie richtig sitzen. Im Sanitätshaus wird die Größe gemessen und der Sitz in Bewegung geprüft.',
    tipps: [
      'Ziehen Sie Kleidung an, mit der Sie das Gelenk zeigen können.',
      'Gehen Sie mit der Bandage ein paar Schritte oder bewegen Sie das Gelenk, bevor Sie sie mitnehmen.',
      'Rutscht sie oder drückt sie, lassen Sie nachmessen. Oft passt eine andere Größe oder Form.',
    ],
  },
  'einlagen-fussanalyse': {
    intro: 'Für orthopädische Einlagen messen viele Sanitätshäuser den Fuß mit einem Scanner oder einer Druckmessplatte aus. Manche machen auch eine Laufanalyse auf dem Laufband. So werden die Einlagen genauer angepasst.',
    tipps: [
      'Bringen Sie die Schuhe mit, in denen Sie die Einlagen tragen wollen.',
      'Fragen Sie, wie lange die Anfertigung dauert und ob ein Termin zur Kontrolle dazugehört.',
      'Gewöhnen Sie sich langsam an neue Einlagen. Drücken sie nach ein bis zwei Wochen noch, lassen Sie nacharbeiten.',
    ],
    guide: 'orthopaedische-einlagen-krankenkasse',
  },
  'prothesen-orthesen': {
    intro: 'Prothesen ersetzen einen Arm oder ein Bein, Orthesen stützen und führen Gelenke. Beides wird in einer Werkstatt für Orthopädietechnik individuell gebaut und oft nachgearbeitet. Kurze Wege sind deshalb viel wert.',
    tipps: [
      'Wählen Sie ein Haus mit eigener Werkstatt in erreichbarer Nähe. In den ersten Monaten sind Anpassungen häufig.',
      'Fragen Sie, ob das Haus mit Ihrer Reha-Klinik oder Ihren Therapeuten zusammenarbeitet.',
      'Fragen Sie nach einem Probe-Modell, bevor die endgültige Version gebaut wird.',
    ],
  },
  'orthopaedische-schuhe': {
    intro: 'Orthopädie-Schuhtechniker passen normale Schuhe an, etwa mit Abrollhilfe oder Erhöhung, und fertigen Maßschuhe für Füße, die in keinen Konfektionsschuh passen.',
    tipps: [
      'Maßschuhe brauchen meist mehrere Termine und einige Wochen. Planen Sie das ein.',
      'Bringen Sie zum ersten Termin Ihre bisherigen Schuhe und Einlagen mit.',
      'Fragen Sie, ob auch Hausschuhe oder Sportschuhe angepasst werden.',
    ],
  },
  'stoma-inkontinenz': {
    intro: 'Für Stoma- und Inkontinenzversorgung arbeiten Sanitätshäuser oft mit ausgebildeten Stoma- und Pflegeexperten. Sie beraten zu passenden Produkten und liefern diskret nach Hause.',
    tipps: [
      'Fragen Sie nach Mustern, bevor Sie sich auf ein Produkt festlegen.',
      'Fragen Sie, ob eine Stomatherapeutin nach Hause kommt, besonders in den ersten Wochen nach der OP.',
      'Klären Sie, wie oft und in welcher Verpackung geliefert wird.',
    ],
  },
  'milchpumpe-mieten': {
    intro: 'Elektrische Milchpumpen in Klinikqualität kann man im Sanitätshaus oder in der Apotheke mieten. Sie sind leistungsstärker als einfache Handpumpen und meist als Doppelpumpe für beide Seiten nutzbar.',
    tipps: [
      'Rufen Sie vorher an. Mietpumpen sind manchmal alle verliehen.',
      'Fragen Sie, ob Sie ein Rezept brauchen und ob das Pumpset mit dabei ist.',
      'Lassen Sie sich die Größe des Brustaufsatzes zeigen. Ein falscher Aufsatz kann schmerzen.',
    ],
  },
  pflegehilfsmittel: {
    intro: 'Pflegehilfsmittel zum Verbrauch sind zum Beispiel Einmalhandschuhe, Desinfektionsmittel, Bettschutzeinlagen und Mundschutz. Viele Sanitätshäuser stellen sie als monatliche Pflegebox zusammen und liefern nach Hause.',
    tipps: [
      'Fragen Sie, ob das Sanitätshaus den Antrag bei der Pflegekasse für Sie stellt.',
      'Achten Sie auf die richtige Handschuhgröße. Lassen Sie sich Muster geben.',
      'Sie können die Zusammenstellung ändern, wenn sich der Bedarf ändert.',
    ],
    guide: 'pflegebox-pflegehilfsmittel',
  },
};
