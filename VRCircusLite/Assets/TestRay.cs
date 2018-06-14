using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TestRay : MonoBehaviour {

    public float distanceToSee;

    // Update is called once per frame
    void Update()
    {

        Debug.DrawRay(this.transform.position, this.transform.forward * distanceToSee, Color.magenta);

        RaycastHit[] hits;
        hits = Physics.RaycastAll(transform.position, transform.forward, distanceToSee);

        for (int i = 0; i < hits.Length; i++)
        {
            triggerDetect(hits[i]);
        }

    }

    private void triggerDetect(RaycastHit chosenObject)
    {

        if (chosenObject.collider.tag == "PanelBase")
        {
            Debug.Log("Pointing at panel " + chosenObject.collider.gameObject.name);
            if (GvrControllerInput.ClickButtonDown || Input.GetKey(KeyCode.P))
            {
                TransitionPanel tp = chosenObject.collider.gameObject.GetComponent<TransitionPanel>();
                if (tp != null)
                {
                    tp.enter();
                }
            }
        }     
    }

}
