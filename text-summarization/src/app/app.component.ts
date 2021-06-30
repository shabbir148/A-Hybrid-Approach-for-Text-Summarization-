import { Component, AfterViewInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ApiService } from "./api";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TEXT SUMMARIZER';
  Summary
  faqsForm: FormGroup;
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.faqsForm = this.formBuilder.group({
      // text: ['(Reuters) - Talks between Greece and euro zone finance ministers over the country\'s debt crisis broke down on Monday when Athens rejected a proposal to request a six-month extension of its international bailout package as unacceptable. The unexpectedly rapid collapse raised doubts about Greece\'s future in the single currency area after a new leftist-led government vowed to scrap the 240 billion euro ($272.4 billion) bailout, reverse austerity policies and end cooperation with EU/IMF inspectors. Dutch Finance Minister Jeroen Dijsselbloem, who chaired the meeting, said Athens had until Friday to request an extension, otherwise the bailout would expire at the end of the month. The Greek state and its banks would then face a looming cash crunch. How long Greece can keep itself afloat without foreign support is uncertain. The euro fell against the dollar after the talks broke up but with Wall Street closed for a holiday, the full force of any market reaction may only be felt on Tuesday. The European Central Bank will decide on Wednesday whether to maintain emergency lending to Greek banks that are bleeding deposits at an estimated rate of 2 billion euros ($2.27 billion) a week. The state faces some heavy loan repayments in March. Seemingly determined not to be browbeaten by a chorus of EU ministers intoning that he needed to swallow Greek pride and come back to ask for the extension, Finance Minister Yanis Varoufakis, a left-wing academic economist, voiced confidence that a deal on different terms was within reach within days. I have no doubt that, within the next 48 hours Europe, is going to come together and we shall find the phrasing that is necessary so that we can submit it and move on to do the real work that is necessary, Varoufakis told a news conference, warning that the language of ultimatum never worked in Europe. He cited what he called a splendid proposal from the European Commission by which Greece would get four to six months credit in return for a freeze on its anti-austerity policies. He said he had been ready to sign that - but that Dijsselbloem had then presented a different, and highly problematic, deal. A draft of what Dijsselbloem proposed, swiftly leaked by furious Greek officials, spoke of Athens extending and abiding by its current programme - anathema to a government which, as Varoufakis said, was elected last month to scrap the package. MORE LOGIC, LESS IDEOLOGY Commission officials denied offering a separate plan and the man Varoufakis said presented it, Economics Commissioner Pierre Moscovici, stuck to the same script as Dijsselbloem. Greece must extend its bailout on the current conditions, he said, even if that could be couched in language that did not embarrass Prime Minister Alexis Tsipras before his supporters. We need more logic and less ideology, Moscovici said as EU officials fretted about how seriously the novice Greek leaders were taking their finances and how far concerns about semantics and saving political face might trump pressing economic needs. Dijsselbloem, who insisted he was willing to be flexible on terminology that has become highly charged for Greek voters, said further talks would depend on Greece requesting a bailout. Varoufakis and the other ministers will remain in Brussels on Tuesday for a routine meeting on the EU economy. The general feeling in the Eurogroup is still that the best way forward would be for the Greek authorities to seek an extension of the programme, Dijsselbloem told a news briefing. Echoing that, Moscovici insisted there was no Plan B, a phrase bounced back in his turn by Varoufakis, who invoked the language of high stakes poker: Its not a bluff, he said. Its Plan A. There is no Plan B. The talks, which had been expected to last late into the night, broke up in less than four hours - less even than a previous meeting last Wednesday after which EU officials voiced concern and astonishment at the Greeks lack of preparation. The euro dropped nearly a U.S. cent on word of stalemate, though edge back to $1.1350, about 0.5 percent down on the day. Both sides showed signs of fraying patience, with several ministers complaining of disappointment and fearing disaster. Dijsselbloem and Varoufakis spoke of a need to rebuild trust. Asked what would happen if Greece did not request a bailout extension, Edward Scicluna, the finance minister of the smallest EU state Malta said: That would be it; it would be a disaster. Greece has to adjust, to realise the seriousness of the situation, because time is running out. Germany, the euro zone\'s main paymaster and Greece\'s biggest creditor, stuck to its hard line. German Finance Minister Wolfgang Schaeuble said before the talks that Greece had lived beyond its means for a long time and there was no appetite in Europe for giving it any more money without guarantees it was getting its finances in order. MONEY FLEEING As the meeting in Brussels broke up, a senior Greek banker said Greece\'s stance boded ill for the markets and the banks. It is a very negative development for the economy and the banks. The outflows will continue. We are losing 400-500 million (euros) every day and that means about 2 billion every week. We will have pressure on stocks and bond yields tomorrow, he said. Varoufakis spelled out in a combative New York Times column Greece\'s refusal to be treated as a debt colony subjected to the greatest austerity for the most depressed economy, adding: The lines that we have presented as red will not be crossed. An opinion poll showed 68 percent of Greeks want a fair compromise with euro zone partners while 30 percent said the government should stand tough even if it means reverting to the drachma. The poll found 81 percent want to stay in the euro. Deposit outflows in Greece have picked up. JP Morgan bank said that at the current pace Greek banks had only 14 weeks before they run out of collateral to obtain funds from the central bank. The ECB has allowed the Greek central bank to provide emergency lending to the banks, but a failure of the debt talks could mean the imposition of capital controls. Euro zone member Cyprus was forced to close its banks for two weeks and introduce capital controls during a 2013 crisis. Such controls would need to be imposed when banks are closed. Greek banks are closed next Monday for a holiday. (Additional reporting by Yann Le Guernigou, Michael Nienaber, Andrew Callus, Jan Strupczewski, Alastair Macdonald, Adrian Croft, Foo Yun Chee, Robin Emmott, Tom Koerkemeier, Julia Fioretti and Francesca Landini; Writing by Jeremy Gaunt, Paul Taylor and Alastair Macdonald; Editing by Paul Taylor, Giles Elgood and Eric Walsh)', Validators.required],
      text: ['',Validators.required]
    });
  }

  async ngOnInit() {

  }

  public async onSubmit() {
    let fuzzy_summ = []
    let lsa_summ = []
    let textrank_summ = []
    let lexrank_sum = []
    let totalLines = 0

    let text = this.faqsForm.value.text.split(". ")
    totalLines = text.length
console.log(totalLines);

    try {
      // let fuzzy_rank = await this.post("https://5002-f29dac02-e335-45e6-a56a-3c0a2b44eeaf.ws-ap01.gitpod.io/fuzzy-rank", this.faqsForm.value)
      // if (fuzzy_rank) {
      //   fuzzy_summ = fuzzy_rank.data.split(". ")
      //   console.log(fuzzy_summ);

      // }
      // let lsa_textrank = await this.post("https://5002-a2237ce2-7db6-4884-a99e-c8f757e6de9a.ws-ap01.gitpod.io/lsa-textrank", this.faqsForm.value)
      // if (lsa_textrank) {
      //   lsa_summ = lsa_textrank.lsa_summary
      //   console.log(lsa_summ);

      //   textrank_summ = lsa_textrank.textrank_summary
      //   console.log(textrank_summ);


      // }

      let lex_rank = await this.post("http://127.0.0.1:4900/lexrank", this.faqsForm.value)
      console.log(lex_rank);

      if (lex_rank) {
        lex_rank = lex_rank.lines
        let summ = []
        for (let l = 0; l < lex_rank.length; l++) {
          const rank = lex_rank[l];
          summ.push(rank.text)

        }
        lexrank_sum = summ
        console.log(lexrank_sum);

      }

      let sentences = {}
      let arr = []
      arr = arr.concat(lexrank_sum, fuzzy_summ, textrank_summ, lsa_summ)
      for (let s = 0; s < arr.length; s++) {
        let element: string = arr[s];
        let fullstop = element.substring(element.length - 1, element.length);
        if (fullstop == ".") {
          element = element.substring(0, element.length - 1);
        }
        if (typeof element == "string") {
          if (sentences[element]) {
            ++sentences[element]

          } else {
            sentences[element] = 1
          }
        }


      }
      let summaryLines = totalLines
      console.log(sentences,summaryLines);
      let finalsummary = ""
      let summarr = []

      for (let f = 0; f < Object.keys(sentences).length; f++) {
        const key = Object.keys(sentences)[f];
        summarr.push({
          text: key,
          value: sentences[key]
        })
      }
      summarr.sort(($0, $1) => {
        return $0.value - $1.value
      })
      for (let s = 0; s < summarr.length; s++) {
        const sum = summarr[s];
        if (s < summaryLines) {
          finalsummary += sum.text + ". "
        }

      }
      this.Summary = finalsummary

    } catch (error) {
      console.log(error);


    }
  }

  post(url: string, body: any): Promise<any> {
    return this.http.post<any>(url, body, this.getHeaders()).pipe(
      map(this.extractData),
      catchError(this.handleError)
    ).toPromise()
  }

  handleError(error: any) {
    console.log(error)
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(error.error);
  }

  getHeaders() {

    return this.httpOptions
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
  public reset() {
    this.Summary = null
    this.faqsForm.reset({
      text: ""
    })
  }
}
